import ScrapableLinkController from "../../../../api/scrapablelink/ScrapableLinkController";
import ScrapedAssetController from "../../../../api/scrapedasset/ScrapedAssetController";
import { SPYAuthenticatorType } from "../../../authenticator/authenticator.type";
import { SPYRouteMethod, SPYRouteProps } from "../../SPYRouter/routes.type";

const ScrapedAssetRoutes: SPYRouteProps[] = [
  {
    path: "/scraped",
    handler: (props, req) => new ScrapedAssetController(props).get(req),
    method: SPYRouteMethod.GET,
    authType: SPYAuthenticatorType.PRIVATE,
  },
];

export default ScrapedAssetRoutes;
