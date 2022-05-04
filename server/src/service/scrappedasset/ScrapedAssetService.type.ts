import {
  ScrapedAssetDBO,
  SPYFileType,
} from "../../repo/scrapedasset/ScrapedAssetRepo.type";

class ScrapedAsset {
  assetLink: string;
  linkId: string;
  type: SPYFileType;

  constructor(dbo: ScrapedAssetDBO) {
    this.assetLink = dbo.AssetLink;
    this.linkId = dbo.LinkId;
    this.type = dbo.Type;
  }
}

export { ScrapedAsset };
