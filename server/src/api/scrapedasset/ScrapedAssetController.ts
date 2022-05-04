import { Request } from "express";
import { SPYFileType } from "../../repo/scrapedasset/ScrapedAssetRepo.type";
import ScrapedAssetService from "../../service/scrappedasset/ScrapedAssetService";
import SPYBaseContoller from "../base/SPYBaseController";
import { SPYBaseControllerProps } from "../base/SPYBaseController.type";
import { GetScrapedAssetResponseDTO } from "./ScrapedAssetController.type";
import parseOrDefault, {
  valueType,
} from "../../crosscutting/utils/dataFormatter/parseOrDefault";

class ScrapedAssetController extends SPYBaseContoller {
  scrapedAssetService: ScrapedAssetService;

  constructor(props: SPYBaseControllerProps) {
    super(props);
    this.scrapedAssetService = new ScrapedAssetService(this.serviceProps);
  }

  async get(request: Request<{}, {}, {}>): Promise<GetScrapedAssetResponseDTO> {
    try {
      return await this.scrapedAssetService.get(
        parseOrDefault(
          request.query.type as string,
          SPYFileType.Any,
          valueType.INTEGER
        ),
        parseOrDefault(request.query.page as string, 0, valueType.INTEGER),
        parseOrDefault(request.query.pageSize as string, 10, valueType.INTEGER)
      );
    } catch (e) {
      throw e;
    }
  }
}

export default ScrapedAssetController;
