import { Injectable } from "express-zeus/decorators";
import * as puppeteer from "puppeteer";
import { Browser } from "puppeteer";
import * as TurndownService from "turndown";
import * as uuidv1 from "uuid/v1";
import * as path from "path";
import * as fs from "fs";

const MD_DEFAULT_SELECTOR = "ARTICLE";
const MD_FILE_SURFIX = "md";
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

  public async generateMd(url: string, selector: string) {
    const page = await this.browser.newPage();
    await page.goto(url);
    const content = await page.$$eval(selector || MD_DEFAULT_SELECTOR, el =>
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
