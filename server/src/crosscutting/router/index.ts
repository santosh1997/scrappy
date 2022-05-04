import { Express } from "express";
import SPYRouter from "./SPYRouter/SPYRouter";

const attachRouter = (app: Express) => {
  try {
    const router = new SPYRouter();
    app.use(router.expressRouterInstance);
  } catch (e) {
    throw e;
  }
};

export { attachRouter };
