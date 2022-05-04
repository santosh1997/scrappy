import UserController from "../../../../api/user/UserContoller";
import { SPYAuthenticatorType } from "../../../authenticator/authenticator.type";
import { SPYRouteMethod, SPYRouteProps } from "../../SPYRouter/routes.type";

const UserRoutes: SPYRouteProps[] = [
  {
    path: "/user/getAll",
    handler: (props, req) => new UserController(props).getAll(),
    method: SPYRouteMethod.GET,
    authType: SPYAuthenticatorType.PRIVATE,
  },
];

export default UserRoutes;
