import { Module } from "@nestjs/common";
import { BookController } from "./book/book.controller";
import { BookService } from "./book/book.service";
import { Book } from "./book/book";
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  imports: [TypegooseModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {
}
