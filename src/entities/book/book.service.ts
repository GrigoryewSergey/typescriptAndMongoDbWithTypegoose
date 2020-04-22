import { Injectable } from "@nestjs/common";
import { Book } from "./book";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class BookService {
  constructor(@InjectModel(Book) private readonly BookModel: ReturnModelType<typeof Book>) {
  }

  allBooks = async () => {
    return await this.BookModel.find()
      .then((books: Book[]) => books)
      .catch(error => console.log(error));
  };

  getBook = (id: string) => {
    return this.BookModel.findById(id)
      .then((book: Book | null) => book)
      .catch(error => console.log(error));
  };

  deleteBook = (id: string) => {
    return this.BookModel.deleteOne({ _id: id })
      .then(ok => ok)
      .catch(error => console.log(error));
  };

  updateBook = (id: string, updateData: object) => {
    return this.BookModel.findByIdAndUpdate(id, updateData)
      .then((book: Book | null) => book)
      .catch(error => console.log(error));
  };

  addBook = (book: Book) => {
    const newBook = new this.BookModel(book);
    newBook.save();
  };
}
