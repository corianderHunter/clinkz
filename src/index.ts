import ClinkzControl from "./control";
import createApplication, { Module } from "express-zeus/decorators";
import * as signale from "signale";
import { name } from "../package.json";
import ClinkzService from "./service";

const appSignale = signale.scope(name);

@Module({
  controls: [ClinkzControl],
  services: [ClinkzService]
})
class AppModule {}

const app = createApplication([AppModule]);

app.listen(3000, err => {
  if (err) {
    appSignale.error(err);
    return;
  }
  appSignale.info("server has started on port 3000");
});
