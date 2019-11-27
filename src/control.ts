import { Control, Get, Query, Res, Inject } from "express-zeus/decorators";
import checkUri from "./helpers/checkUri";
import ClinkzService from "./service";
import { Response } from "express";
import * as path from "path";
import buildDispositionHeader from "./helpers/buildDispositionHeader";

@Control("/clinkz")
export default class ClinkzControl {
  constructor(private service: ClinkzService) {}

  @Get("/image")
  generateImage(@Query("url") url, @Query("query") query, @Res res) {
    if (!checkUri(url)) {
      return res.status(400).send("url is not invalid!");
    }
    return "generate image";
  }

  @Get("/pdf")
  generatePdf(@Query("url") url, @Query("selector") selector, @Res res) {
    if (!checkUri(url)) {
      return res.status(400).send("url is not invalid!");
    }
    return "generate pdf";
  }

  @Get("/word")
  async generateWord(@Query("url") url, @Query("selector") selector, @Res res) {
    if (!checkUri(url)) {
      return res.status(400).send("url is not invalid!");
    }
    const filename = await this.service.generateWord(url, selector);
    const dispositionHeader = buildDispositionHeader(path.basename(filename));
    res.sendFile(filename, { headers: { ...dispositionHeader } });
    return false;
  }

  @Get("/markdown")
  async generateMd(
    @Query("url") url,
    @Query("selector") selector,
    @Res res: Response
  ) {
    if (!checkUri(url)) {
      return res.status(400).send("url is not invalid!");
    }
    const filename = await this.service.generateMd(url, selector);
    const dispositionHeader = buildDispositionHeader(path.basename(filename));
    res.sendFile(filename, { headers: { ...dispositionHeader } });
    return false;
  }
}
