import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BookModule } from "./entities/book/bookModule";
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  imports: [TypegooseModule.forRoot("mongodb://localhost:27017/nest"),
    BookModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
