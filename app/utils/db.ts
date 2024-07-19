import { prisma } from "./prisma";

export async function getBooks(search: string): Promise<book[]> {
	const books: book[] = await prisma.book.findMany({
		select: {
			id: true,
			title: true,
			year: true,
			category: {
				select: {
					name: true,
				},
			},
			publisher: {
				select: {
					name: true,
				},
			},
			writer: {
				select: {
					name: true,
				},
			},
		},
		where: {
			OR: [
				{
					title: {
						contains: search,
						mode: "insensitive",
					},
				},
				{
					writer: {
						name: {
							contains: search,
							mode: "insensitive",
						},
					},
				},
			],
		},
		orderBy: {
			title: "asc",
		},
	});

	return books;
}

export async function getBook(idBook: number): Promise<editBook | null> {
	const book: editBook | null = await prisma.book.findFirst({
		select: {
			id: true,
			title: true,
			year: true,
			category: {
				select: {
					id: true,
				},
			},
			publisher: {
				select: {
					id: true,
				},
			},
			writer: {
				select: {
					id: true,
				},
			},
		},
		where: {
			id: idBook,
		},
	});

	return book;
}

export async function getWriter({
	name,
}: {
	name: string;
}): Promise<{ id: number; name: string } | null> {
	const writer: { id: number; name: string } | null =
		await prisma.writer.findFirst({
			where: {
				name: {
					contains: name,
					mode: "insensitive",
				},
			},
		});

	return writer;
}

export async function insertBook({
	title,
	year,
	publisherId,
	writerId,
	categoryId,
}: bookData): Promise<bookResult> {
	const book: bookResult = await prisma.book.create({
		data: {
			title,
			year,
			publisherId,
			writerId,
			categoryId,
		},
	});

	return book;
}

export async function insertWriter({
	name,
}: {
	name: string;
}): Promise<{ id: number; name: string }> {
	const writer: { id: number; name: string } = await prisma.writer.create({
		data: {
			name,
		},
	});

	return writer;
}

export async function editBook({
	id,
	title,
	year,
	publisherId,
	writerId,
	categoryId,
}: bookDataEdit): Promise<bookResult> {
	const book: bookResult = await prisma.book.update({
		data: {
			title,
			year,
			publisherId,
			writerId,
			categoryId,
		},
		where: {
			id,
		},
	});

	return book;
}

export async function deleteBook(id: number): Promise<bookResult> {
	const book: bookResult = await prisma.book.delete({
		where: {
			id,
		},
	});

	return book;
}

export async function getCategories(): Promise<foreign[]> {
	const categories: foreign[] = await prisma.category.findMany({
		orderBy: {
			name: "asc",
		},
	});

	return categories;
}

export async function getWriters(): Promise<foreign[]> {
	const writers: foreign[] = await prisma.writer.findMany({
		orderBy: {
			name: "asc",
		},
	});

	return writers;
}

export async function getPublishers(): Promise<foreign[]> {
	const publishers: foreign[] = await prisma.publisher.findMany({
		orderBy: {
			name: "asc",
		},
	});

	return publishers;
}
