import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import * as bookController from "./entities/book/book.controller";

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (request: Request, response: Response) => response.send("OK"));

app.get("/books", bookController.allBooks);
app.get("/book/:id", bookController.getBook);
app.post("/book", bookController.addBook);
app.put("/book/:id", bookController.updateBook);
app.delete("/book/:id", bookController.deleteBook);

const server = app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
