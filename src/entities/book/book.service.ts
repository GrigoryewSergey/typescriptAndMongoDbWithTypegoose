import mongoose = require("mongoose");
import { getModelForClass } from "@typegoose/typegoose";
import { Book } from "./book";

mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

const BookModel = getModelForClass(Book);

export const allBooks = () => {
  return BookModel.find()
    .then((books: Book[]) => books)
    .catch(error => console.log(error));
};

export const getBook = (id: string) => {
  return BookModel.findById(id)
    .then((book: Book | null) => book)
    .catch(error => console.log(error));
};

export const deleteBook = (id: string) => {
  return BookModel.deleteOne({ _id: id })
    .then(ok => ok)
    .catch(error => console.log(error));
};

export const updateBook = (id: string, updateData: object) => {
  return BookModel.findByIdAndUpdate(id, updateData)
    .then((book: Book | null) => book)
    .catch(error => console.log(error));
};

export const addBook = (book: Book) => {
  const newBook = new BookModel(book);
  newBook.save();
};
