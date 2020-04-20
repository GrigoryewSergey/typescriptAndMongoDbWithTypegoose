import { Request, Response } from "express";
import mongoose = require("mongoose");
import { getModelForClass } from "@typegoose/typegoose";
import { Book } from "./book";

mongoose.connect("mongodb://localhost:27017/books", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });

const BookModel = getModelForClass(Book);

const validateRequest = (request: Request, shouldBeHasId: boolean = false, shouldBeHasBody: boolean = false): boolean => {
  if (shouldBeHasId && !request.params.id) return false;

  if (shouldBeHasBody && !request.body) return false;

  return true;
};

const sendResponse = (response: Response, entity: Book | null, error: any, errorStatusCode: number = 404) => {
  if (error) {
    return response.send(error);
  } else {
    if (!entity) {
      return response.sendStatus(errorStatusCode);
    }

    return response.send(entity);
  }
};

export const allBooks = (request: Request, response: Response) => {
  BookModel.find((error: any, books: any) => {
    sendResponse(response, books, error);
  });
};

export const getBook = (request: Request, response: Response) => {
  if (!validateRequest(request, true)) {
    return response.sendStatus(400);
  }

  BookModel.findById(request.params.id, (error: any, book: any) => {
    sendResponse(response, book, error);
  });
};

export const deleteBook = (request: Request, response: Response) => {
  if (!validateRequest(request, true)) {
    return response.sendStatus(400);
  }

  BookModel.deleteOne({ _id: request.params.id }, (error: any) => {
    sendResponse(response, null, error);
  });
};

export const updateBook = (request: Request, response: Response) => {
  if (!validateRequest(request, true, true)) {
    return response.sendStatus(400);
  }

  BookModel.findByIdAndUpdate(request.params.id, request.body, (error: any, book: any) => {
    sendResponse(response, book, error);
  });
};

export const addBook = (request: Request, response: Response) => {
  if (!validateRequest(request, false, true)) {
    return response.sendStatus(400);
  }

  const newBook = new BookModel(request.body);

  newBook.save((error: any) => {
    sendResponse(response, newBook, error);
  });
};
