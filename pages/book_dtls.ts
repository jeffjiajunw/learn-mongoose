import { Request, response, Response } from 'express';
import Book, { IBook }  from '../models/book';
import BookInstance, { IBookInstance }  from '../models/bookinstance';
import express from 'express';

const router = express.Router();

const showBookDtls = async (res: Response, id: string): Promise<void> => {
  try {
    const [book, copies] = await Promise.all([
      Book.getBook(id),
      BookInstance.getBookDtl(id)
    ]);

    if (!book) {
      res.status(404).send(`Book ${id} not found`);
      return;
    }

    res.send({
      title: book.title,
      author: book.author.name,
      copies: copies
    });
  } catch (err) {
    res.status(500).send(`Error fetching book ${id}`);
  }
};

router.get('/', async (req: Request, res: Response) => {
    showBookDtls(res, req.query.id as string);
})

export default router;