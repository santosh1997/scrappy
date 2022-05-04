import UserSessionController from "../../../../api/usersession/UserSessionContoller";
import { SPYAuthenticatorType } from "../../../authenticator/authenticator.type";
import { SPYRouteMethod, SPYRouteProps } from "../../SPYRouter/routes.type";

const UserSessionRoutes: SPYRouteProps[] = [
  {
    path: "/auth/signin",
    handler: (props, req) => new UserSessionController(props).signIn(req),
    method: SPYRouteMethod.POST,
    authType: SPYAuthenticatorType.PUBLIC,
  },
];

export default UserSessionRoutes;
