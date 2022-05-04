import ScrapableLinkRoutes from "./scrapableLinkRoutes/ScrapableLinkRoutes";
import ScrapedAssetRoutes from "./scrapedAssetRoutes/ScrapedAssetRoutes";
import UserRoutes from "./userRoutes/UserRoutes";
import UserSessionRoutes from "./userSessionRoutes/UserSessionRoutes";

export default [
  ...UserRoutes,
  ...UserSessionRoutes,
  ...ScrapableLinkRoutes,
  ...ScrapedAssetRoutes,
];
