import { Query } from "express-serve-static-core";
import { SPYFileType } from "../../repo/scrapedasset/ScrapedAssetRepo.type";

interface GetScrapedAssetResponseDTO {
  records: { assetLink: string; linkId: string; type: SPYFileType }[];
  count: number;
}

export { GetScrapedAssetResponseDTO };
