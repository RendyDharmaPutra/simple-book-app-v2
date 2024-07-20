import ActionBar from "~/components/dashboard/actionBar";
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	TypedDeferredData,
	TypedResponse,
} from "@remix-run/node";
import { Await, defer, redirect, useLoaderData } from "@remix-run/react";
import { deleteBook, getBooks } from "~/utils/db";
import { Suspense } from "react";
import Table from "~/components/dashboard/table";

export async function loader({ request }: LoaderFunctionArgs): Promise<
	TypedDeferredData<{
		books: Promise<book[]>;
	}>
> {
	const url: URL = new URL(request.url);
	const search: string = url.searchParams.get("search") || "";

	const books: Promise<book[]> = getBooks(search);

	return defer({
		books: books,
	});
}

export default function Home(): JSX.Element {
	const { books } = useLoaderData<typeof loader>();

	return (
		<section className="layout gap-6 w-full rounded-2xl bg-white">
			<h1 className="headline">Daftar Buku</h1>
			<ActionBar />
			<Suspense>
				<Await resolve={books}>{(books) => <Table books={books} />}</Await>
			</Suspense>
		</section>
	);
}

export async function action({
	request,
}: ActionFunctionArgs): Promise<TypedResponse<never> | undefined> {
	const body: FormData = await request.formData();
	const idBook: number = Number(body.get("idBook"));

	const result: bookResult = await deleteBook(idBook);

	if (result) return redirect("/");
}
