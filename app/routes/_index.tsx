import ActionBar from "~/components/dashboard/actionBar";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { getBooks } from "~/utils/db";
import { Suspense } from "react";
import Table from "~/components/dashboard/table";

export async function loader({ request }: LoaderFunctionArgs) {
	const url: URL = new URL(request.url);
	const search: string = url.searchParams.get("search") || "";

	const books: Promise<book[]> = getBooks(search);

	return defer({
		books: books,
	});
}

export default function Home(): JSX.Element {
	const { books } = useLoaderData<typeof loader>();

	console.log(books);

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
