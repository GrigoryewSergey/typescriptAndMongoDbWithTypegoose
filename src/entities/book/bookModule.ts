import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { Book } from "./book";
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  imports: [TypegooseModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {
}
