import { Request, Response } from "express";
import * as bookService from "../services/books";

export const getBooks = async (req: Request, res: Response) => {
	const books = await bookService.getBooks();
	res.json(books).status(200);
};

export const getBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;
	const book = await bookService.getBook(Number(bookId));

	if (book) {
		res.json(book).status(200);
	} else {
		res.status(404).json("Not found");
	}
};

export const saveBook = async (req: Request, res: Response) => {
	const bookToBeSaved = req.body;
	try {
		//const book = await bookService.saveBook(bookToBeSaved);
		//res.status(201).json(book);
		const bookCheck = await bookService.getBook(Number(bookToBeSaved.bookId));
		if (bookCheck) {
			//res.status(406).json("Book Id already exists");
			throw new Error("Book Id already exists");
		} else {
			const book = await bookService.saveBook(bookToBeSaved);
			res.status(201).json(book);
		}
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};
//};

// User Story 4 - Update Book By Id Solution
export const updateBook = async (req: Request, res: Response) => {
	const bookUpdateData = req.body;
	const bookId = Number.parseInt(req.params.bookId);

	const book = await bookService.updateBook(bookId, bookUpdateData);
	res.status(204).json(book);
};

//user story 5 - delete Book by id solution

export const deleteBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;
	const book = await bookService.deleteBook(Number(bookId));

	if (book) {
		res.json(`Book deleted successfully with book id : ${bookId}`).status(200);
	} else {
		res.json(`Book not found with book id : ${bookId}`).status(404);
	}
};
