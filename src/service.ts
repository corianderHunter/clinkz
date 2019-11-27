import { Injectable } from "express-zeus/decorators";
import * as puppeteer from "puppeteer";
import { Browser } from "puppeteer";
import * as TurndownService from "turndown";
import * as uuidv1 from "uuid/v1";
import * as path from "path";
import * as fs from "fs";
import * as HtmlDocx from "html-docx-js";

const MD_FILE_SURFIX = "md";
const WORD_FILE_SURFIX = "doc";
const OUTPUT_PATH = path.join(__dirname, "..", "output");

export default class ClinkzService {
  private browser: Browser;
  private turndownService = new TurndownService();

  constructor() {
    this.initBrowser();
  }

  public async initBrowser() {
    this.browser = await puppeteer.launch();
  }

  public async generateWord(url: string, selector = "") {
    const page = await this.browser.newPage();
    await page.goto(url);
    const content = await page.$$eval(selector || "BODY", el =>
      el.reduce((s, v) => {
        return s.concat(v.outerHTML || "");
      }, "")
    );
    const docx = HtmlDocx.asBlob(content);
    const filename = path.join(OUTPUT_PATH, uuidv1() + "." + WORD_FILE_SURFIX);
    fs.writeFileSync(filename, docx);
    return filename;
  }

  public async generateMd(url: string, selector = "") {
    const page = await this.browser.newPage();
    await page.goto(url);
    const content = await page.$$eval(selector || "ARTICLE", el =>
      el.reduce((s, v) => {
        return s.concat(v.outerHTML || "");
      }, "")
    );
    if (!content) {
      throw new Error(
        'get nothing found for generating markdown,try to set query "selector" to specify your target content.'
      );
    }
    const markdown = this.turndownService.turndown(content);
    const filename = path.join(OUTPUT_PATH, uuidv1() + "." + MD_FILE_SURFIX);
    fs.writeFileSync(filename, markdown);
    return filename;
  }
}
