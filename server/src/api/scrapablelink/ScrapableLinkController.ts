import { Request } from "express";
import Encryptor from "../../crosscutting/encryptor/encryptor";
import ScrapableLinkService from "../../service/scrapablelink/ScrapableLinkService";
import UserSessionService from "../../service/usersession/UserSessionService";
import SPYBaseContoller from "../base/SPYBaseController";
import { SPYBaseControllerProps } from "../base/SPYBaseController.type";
import {
  AddScrapableLinkRequestDTO,
  AddScrapableLinkResponseDTO,
} from "./ScrapableLinkController.type";

class ScrapableLinkController extends SPYBaseContoller {
  scrapableLinkService: ScrapableLinkService;

  constructor(props: SPYBaseControllerProps) {
    super(props);
    this.scrapableLinkService = new ScrapableLinkService(this.serviceProps);
  }

  async add(
    request: Request<{}, {}, AddScrapableLinkRequestDTO>
  ): Promise<AddScrapableLinkResponseDTO> {
    try {
      const status = await this.scrapableLinkService.add(request.body.links);
      return {
        status,
      };
    } catch (e) {
      throw e;
    }
  }
}

export default ScrapableLinkController;
