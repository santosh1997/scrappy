import { Request } from "express";
import { SPYBaseControllerProps } from "../../../api/base/SPYBaseController.type";
import { SPYAuthenticatorType } from "../../authenticator/authenticator.type";

interface SPYRouteProps {
  path: string;
  handler: RouteHandler;
  method: SPYRouteMethod;
  authType: SPYAuthenticatorType;
}

type RouteHandler = (props: SPYBaseControllerProps, req: Request) => Promise<{}>;

enum SPYRouteMethod {
  GET = "get",
  POST = "post",
}

export { SPYRouteProps, SPYRouteMethod, RouteHandler };
