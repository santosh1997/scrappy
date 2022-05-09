import { Router } from "express";
import Authenticator from "../../authenticator";
import errorHandler from "../../errorHandler/errorHandler";
import Routes from "../routes";
import { SPYRouteProps } from "./routes.type";

class SPYRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.loadRoutes();
  }

  get expressRouterInstance(): Router {
    return this.router;
  }

  private addRoute(props: SPYRouteProps) {
    this.router[props.method](props.path, async (req, res) => {
      try {
        const result = await Authenticator[props.authType](
          req,
          async (baseControllerProps) => {
            return props.handler(baseControllerProps, req);
          }
        );
        res.json(result);
      } catch (e) {
        const errorResponse = errorHandler(e);
        res.status(errorResponse.status).json({
          name: errorResponse.name,
          message: errorResponse.message,
        });
      }
    });
  }

  private loadRoutes(): void {
    Routes.forEach((route) => {
      this.addRoute(route);
    });
  }
}

export default SPYRouter;
