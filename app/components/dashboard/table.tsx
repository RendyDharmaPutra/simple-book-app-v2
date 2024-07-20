import { Link } from "@remix-run/react";
import ModalButton from "./modal_button";
import NotFound from "./not_found";

export default function Table({ books }: { books: book[] }): JSX.Element {
	return (
		<div className="relative flex flex-col w-full h-[30rem] overflow-x-scroll text-gray-800 bg-zinc-50 shadow-md">
			{books.length == 0 ? (
				<NotFound />
			) : (
				<table className="w-full min-w-max text-left table-auto md:table-fixed">
					<thead>
						<tr>
							<THead name="Judul" />
							<THead name="Penulis" />
							<THead name="Kategori" />
							<THead name="Penerbit" />
							<THead name="Tahun Terbit" />
							<THead name="Aksi" />
						</tr>
					</thead>
					<tbody>
						{books.map((book) => (
							<TBody
								key={book.id}
								idBook={book.id}
								title={book.title}
								writer={book.writer.name}
								publisher={book.publisher.name}
								category={book.category.name}
								year={book.year}
							/>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

function THead({ name }: { name: string }): JSX.Element {
	return (
		<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
			<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
				{name}
			</p>
		</th>
	);
}

function TBody({
	idBook,
	title,
	writer,
	publisher,
	category,
	year,
}: tableBody): JSX.Element {
	return (
		<tr>
			<TCol content={title} />
			<TCol content={category} />
			<TCol content={writer} />
			<TCol content={publisher} />
			<TCol content={year} />
			<td className="tcol">
				<Link
					prefetch="viewport"
					to={`/${idBook}`}
					className="mr-2 tbutton text-primary"
				>
					Ubah
				</Link>
				<ModalButton id={idBook} title={title} />
			</td>
		</tr>
	);
}

function TCol({ content }: { content: string | number }): JSX.Element {
	return (
		<td className="tcol">
			<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
				{content}
			</p>
		</td>
	);
}
