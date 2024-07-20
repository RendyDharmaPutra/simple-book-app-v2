// import Error from "../app/[idBook]/error";
import { Await, defer, Form, redirect, useLoaderData } from "@remix-run/react";
import AddButton from "../components/form/add_button";
import Input from "../components/form/input";
import {
	editBook,
	getBook,
	getCategories,
	getPublishers,
	getWriters,
} from "../utils/db";
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	TypedDeferredData,
	TypedResponse,
} from "@remix-run/node";
import { Suspense } from "react";

export async function loader({ params }: LoaderFunctionArgs): Promise<
	TypedDeferredData<{
		categories: Promise<foreign[]>;
		writers: Promise<foreign[]>;
		publishers: Promise<foreign[]>;
		book: Promise<editBook | null>;
	}>
> {
	const categories: Promise<foreign[]> = getCategories();
	const writers: Promise<foreign[]> = getWriters();
	const publishers: Promise<foreign[]> = getPublishers();
	const book: Promise<editBook | null> = getBook(Number(params.id));

	return defer({
		categories,
		writers,
		publishers,
		book,
	});
}

export default function EditBook(): JSX.Element {
	const { categories, writers, publishers, book } =
		useLoaderData<typeof loader>();

	return (
		<Form method="put" className="layout gap-6 w-full rounded-2xl bg-white">
			<h1 className="headline">Tambah Buku</h1>
			<div className="row-section flex-wrap gap-6 md:gap-4">
				<Suspense fallback={<h1>Loading...</h1>}>
					<Await resolve={book}>
						{(book) => (
							<>
								<input type="hidden" name="id" value={book!.id} />
								<Input
									defaultValue={book!.title}
									name="title"
									label="Judul Buku"
									type="text"
									data={null}
								/>
								<Input
									defaultValue={book!.year}
									name="year"
									label="Tahun Terbit"
									type="text"
									data={null}
								/>
								<Suspense fallback={<h1>Loading...</h1>}>
									<Await resolve={writers}>
										{(writers) => (
											<Input
												defaultValue={book!.writer.id}
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
												defaultValue={book!.publisher.id}
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
												defaultValue={book!.category.id}
												name="category"
												label="Kategori"
												type="select"
												data={categories}
											/>
										)}
									</Await>
								</Suspense>
							</>
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
	const book: bookDataEdit = {
		id: Number(body.get("id")),
		title: String(body.get("title")),
		year: Number(body.get("year")),
		writerId: Number(body.get("writer")),
		publisherId: Number(body.get("publisher")),
		categoryId: Number(body.get("category")),
	};

	const result: bookResult = await editBook(book);
	if (result) return redirect("/");
}
