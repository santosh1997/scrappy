import SPYInvalidLinkError from "../../crosscutting/errorHandler/errors/Link/SPYInvalidLinkError";
import stringValidator from "../../crosscutting/validator/stringvalidator";
import ScrapedAssetRepo from "../../repo/scrapedasset/ScrapedAssetRepo";
import {
  ScrapedAssetDBO,
  SPYFileType,
} from "../../repo/scrapedasset/ScrapedAssetRepo.type";
import SPYBaseService from "../base/SPYBaseService";
import { SPYBaseServiceProps } from "../base/SPYBaseService.type";
import {
  SupportedImageExtensions,
  SupportedVideoExtensions,
} from "./ScrapedAssetService.constants";
import { ScrapedAsset } from "./ScrapedAssetService.type";

class ScrapedAssetService extends SPYBaseService {
  scrapedAssetRepo: ScrapedAssetRepo;

  constructor(props: SPYBaseServiceProps) {
    super(props);
    this.scrapedAssetRepo = new ScrapedAssetRepo(this.repoProps);
  }

  async add(links: string[], scrapableLinkId: string): Promise<"Success"> {
    if (!(links && links.length))
      throw new SPYInvalidLinkError("No link present in the list");

    links = links.filter((link) => stringValidator.isValidLink(link));

    const scrapedLinks = this.getScrapedLinks(links, scrapableLinkId);
    return this.scrapedAssetRepo.add(
      scrapedLinks.filter((link) => link.Type !== SPYFileType.Any)
    );
  }

  private getScrapedLinks(links: string[], linkId: string): ScrapedAssetDBO[] {
    return links.map((link) => {
      return {
        AssetLink: link,
        LinkId: linkId,
        Type: this.getFileType(link),
      } as ScrapedAssetDBO;
    });
  }

  private getFileType(link: string): SPYFileType {
    const extension = link.split(".").pop() || "";
    if (SupportedImageExtensions.includes(extension)) return SPYFileType.Image;
    if (SupportedVideoExtensions.includes(extension)) return SPYFileType.Video;
    return SPYFileType.Any;
  }

  async get(
    type: SPYFileType,
    page: number,
    pageSize: number
  ): Promise<{ records: ScrapedAsset[]; count: number }> {
    const resultDBO = await this.scrapedAssetRepo.get(type, page, pageSize);
    return {
      records: resultDBO.records.map((record) => new ScrapedAsset(record)),
      count: resultDBO.count,
    };
  }
}

export default ScrapedAssetService;
