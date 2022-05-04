import ScrapableLinkController from "../../../../api/scrapablelink/ScrapableLinkController";
import { SPYAuthenticatorType } from "../../../authenticator/authenticator.type";
import { SPYRouteMethod, SPYRouteProps } from "../../SPYRouter/routes.type";

const ScrapableLinkRoutes: SPYRouteProps[] = [
  {
    path: "/scrap/add",
    handler: (props, req) => new ScrapableLinkController(props).add(req),
    method: SPYRouteMethod.POST,
    authType: SPYAuthenticatorType.PRIVATE,
  },
];

export default ScrapableLinkRoutes;
