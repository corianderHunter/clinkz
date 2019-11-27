import { Control, Post } from "express-zeus/decorators";

@Control("/clinkz")
export default class ClinkzControl {
  @Post("/image")
  generateImage() {
    return "generate image";
  }
}
