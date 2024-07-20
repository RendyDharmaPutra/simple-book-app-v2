import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	TypedDeferredData,
	TypedResponse,
} from "@remix-run/node";
import AddButton from "../components/form/add_button";
import Input from "../components/form/input";
import {
	getCategories,
	getPublishers,
	getWriters,
	insertBook,
} from "../utils/db";
import { Await, defer, Form, redirect, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export async function loader({ request }: LoaderFunctionArgs): Promise<
	TypedDeferredData<{
		categories: Promise<foreign[]>;
		writers: Promise<foreign[]>;
		publishers: Promise<foreign[]>;
	}>
> {
	const categories: Promise<foreign[]> = getCategories();
	const writers: Promise<foreign[]> = getWriters();
	const publishers: Promise<foreign[]> = getPublishers();

	return defer({
		categories,
		writers,
		publishers,
	});
}

export default function AddPage(): JSX.Element {
	const { categories, writers, publishers } = useLoaderData<typeof loader>();

	return (
		<Form method="post" className="layout gap-6 w-full rounded-2xl bg-white">
			<h1 className="headline">Tambah Buku</h1>
			<div className="row-section flex-wrap gap-6 md:gap-4">
				<Input
					defaultValue=""
					name="title"
					label="Judul Buku"
					type="text"
					data={null}
				/>
				<Input
					defaultValue=""
					name="year"
					label="Tahun Terbit"
					type="text"
					data={null}
				/>
				<Suspense fallback={<h1>Loading...</h1>}>
					<Await resolve={writers}>
						{(writers) => (
							<Input
								defaultValue=""
								name="writer"
								label="Penulis"
								type="select"
								data={writers}
							/>
						)}
					</Await>
				</Suspense>
				<Suspense fallback={<h1>Loading...</h1>}>
					<Await resolve={publishers}>
						{(publishers) => (
							<Input
								defaultValue=""
								name="publisher"
								label="Penerbit"
								type="select"
								data={publishers}
							/>
						)}
					</Await>
				</Suspense>
				<Suspense fallback={<h1>Loading...</h1>}>
					<Await resolve={categories}>
						{(categories) => (
							<Input
								defaultValue=""
								name="category"
								label="Kategori"
								type="select"
								data={categories}
							/>
						)}
					</Await>
				</Suspense>
			</div>
			<AddButton />
		</Form>
	);
}

export async function action({
	request,
}: ActionFunctionArgs): Promise<TypedResponse<never> | undefined> {
	const body: FormData = await request.formData();
	const book: bookData = {
		title: String(body.get("title")),
		year: Number(body.get("year")),
		writerId: Number(body.get("writer")),
		publisherId: Number(body.get("publisher")),
		categoryId: Number(body.get("category")),
	};

	const result: bookResult = await insertBook(book);
	if (result) return redirect("/");
}
