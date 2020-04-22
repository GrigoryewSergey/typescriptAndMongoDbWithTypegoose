import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BookService } from "./book.service";
import { Book } from "./book";

@Controller("books")
export class BookController {
  constructor(private readonly bookService: BookService) {
  }

  @Get()
  async listBooks() {
    const list = await this.bookService.allBooks();
    console.log(list);
    return list;
  }

  @Get(":id")
  async getBook(@Param() param: string) {
    return await this.bookService.getBook(param);
  }

  @Post()
  async createUser(@Body() book: Book) {
    return this.bookService.addBook(book);
  }

  @Put(":id")
  async updateBook(@Param() param: string, @Body() updateData) {
    return await this.bookService.updateBook(param, updateData);
  }

  @Delete(":id")
  async deleteBook(@Param() param: string) {
    return await this.bookService.deleteBook(param);
  }

}

/*mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

const BookModel = getModelForClass(Book);

const validateRequest = (request: Request, shouldHaveId: boolean = false, shouldHaveBody: boolean = false): boolean => {
  if (shouldHaveId && !request.params.id) return false;

  if (shouldHaveBody && !request.body) return false;

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
};*/