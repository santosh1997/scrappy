import express, { Express } from "express";
import bodyParser from "body-parser";
import { attachCompressor } from "../crosscutting/compressor";
import { attachRouter } from "../crosscutting/router";
import { getEnvVar } from "../crosscutting/processor";

(() => {
  const attachMiddlewares = (app: Express) => {
    app.use(bodyParser.json());
    attachCompressor(app);
    attachRouter(app);
  };

  const app: Express = express();
  const port: string = getEnvVar("PORT") || "1000";
  attachMiddlewares(app);
  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
})();
