import { prop } from "@typegoose/typegoose";

export class Book {
  @prop({ required: true })
  title: string = "";

  @prop({ required: true })
  author: string = "";
}
