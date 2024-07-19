interface tableBody {
	idBook: number;
	title: string;
	writer: string;
	publisher: string;
	year: number;
	category: string;
}

interface book {
	id: number;
	title: string;
	writer: {
		name: string;
	};
	publisher: {
		name: string;
	};
	category: {
		name: string;
	};
	year: number;
}

interface editBook {
	id: number;
	title: string;
	writer: {
		id: number;
	};
	publisher: {
		id: number;
	};
	category: {
		id: number;
	};
	year: number;
}

interface bookData {
	title: string;
	year: number;
	categoryId: number;
	writerId: number;
	publisherId: number;
}

interface bookDataEdit extends bookData {
	id: number;
}

interface bookResult {
	id: number;
	title: string;
	year: number;
	categoryId: number;
	writerId: number;
	publisherId: number;
}

interface foreign {
	id: number;
	name: string;
}
