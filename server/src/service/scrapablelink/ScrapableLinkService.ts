import { URL } from "url";
import SPYInvalidLinkError from "../../crosscutting/errorHandler/errors/Link/SPYInvalidLinkError";
import stringValidator from "../../crosscutting/validator/stringvalidator";
import ScrapableLinkRepo from "../../repo/scrapablelink/ScrapableLinkRepo";
import SPYBaseService from "../base/SPYBaseService";
import { SPYBaseServiceProps } from "../base/SPYBaseService.type";
import { ScrapableLink } from "./ScrapableLinkService.type";

class ScrapableLinkService extends SPYBaseService {
  scrapableLinkRepo: ScrapableLinkRepo;

  constructor(props: SPYBaseServiceProps) {
    super(props);
    this.scrapableLinkRepo = new ScrapableLinkRepo(this.repoProps);
  }

  async add(links: string[]): Promise<"Success"> {
    if (!(links && links.length))
      throw new SPYInvalidLinkError("No link present in the list");
    this.validateLinks(links);
    return this.scrapableLinkRepo.add(links);
  }

  private validateLinks(links: string[]) {
    links.forEach((link) => {
      if (!stringValidator.isValidLink(link))
        throw new SPYInvalidLinkError(`Invalid URL: ${link}`);
    });
  }

  async get(): Promise<ScrapableLink | null> {
    const link = await this.scrapableLinkRepo.get();
    return link
      ? { id: link.Id, link: link.Link, processId: link.ProcessId }
      : null;
  }
}

export default ScrapableLinkService;
