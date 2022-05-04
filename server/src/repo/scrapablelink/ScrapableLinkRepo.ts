import { QueryError, RowDataPacket } from "mysql2";
import SPYMySQLQueryError from "../../crosscutting/errorHandler/errors/MySQL/SPYMySQLQueryError";
import SPYError from "../../crosscutting/errorHandler/errors/SPYError";
import SPYBaseRepo from "../base/SPYBaseRepo";
import { SPYBaseRepoProps } from "../base/SPYBaseRepo.type";
import { ScrapableLinkDBO } from "./ScrapableLinkRepo.type";

class ScrapableLinkRepo extends SPYBaseRepo {
  constructor(props: SPYBaseRepoProps) {
    super(props);
  }
  async add(links: string[]): Promise<"Success"> {
    try {
      const queryResult = await this.db.executeCommand<RowDataPacket[][]>(
        {
          queryText: this.getAddQueryText(links.length),
          queryParams: this.getAddQueryParams(links),
        },
        false
      );
      return "Success";
    } catch (e) {
      throw e;
    }
  }

  private getAddQueryText(numberOfLinks: number): string {
    const queryPrefix =
        "INSERT INTO `ScrapableLink` (`Link`,`CreatedBy`) VALUES",
      valuesToInsert: string[] = [],
      queryValue = "(?, ?)";
    for (let i = 0; i < numberOfLinks; i++) valuesToInsert.push(queryValue);
    return `${queryPrefix} ${valuesToInsert.join(", ")};`;
  }

  private getAddQueryParams(links: string[]): string[] {
    const params: string[] = [];
    links.forEach((link) => {
      params.push(link);
      params.push(this.props.userContext.userId);
    });
    return params;
  }

  async get(): Promise<ScrapableLinkDBO | null> {
    try {
      const queryResult = await this.db.executeCommand<ScrapableLinkDBO[][]>(
        {
          queryText: `CALL udsp_Scrap_Init();`,
          queryParams: [],
        },
        true
      );
      return queryResult.results[0].length ? queryResult.results[0][0] : null;
    } catch (e) {
      throw e;
    }
  }
}

export default ScrapableLinkRepo;
