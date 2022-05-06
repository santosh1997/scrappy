import { RowDataPacket } from "mysql2";
import SPYBaseRepo from "../base/SPYBaseRepo";
import { RowCountDBO, SPYBaseRepoProps } from "../base/SPYBaseRepo.type";
import { ScrapedAssetDBO, SPYFileType } from "./ScrapedAssetRepo.type";

class ScrapedAssetRepo extends SPYBaseRepo {
  constructor(props: SPYBaseRepoProps) {
    super(props);
  }
  async add(links: ScrapedAssetDBO[]): Promise<"Success"> {
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
        "INSERT INTO `ScrapedAssets` (`AssetLink`, `LinkId`, `Type`) VALUES",
      valuesToInsert: string[] = [],
      queryValue = "(?, ?, ?)";
    for (let i = 0; i < numberOfLinks; i++) valuesToInsert.push(queryValue);
    return `${queryPrefix} ${valuesToInsert.join(", ")};`;
  }

  private getAddQueryParams(links: ScrapedAssetDBO[]): (string | number)[] {
    const params: (string | number)[] = [];
    links.forEach((link) => {
      params.push(link.AssetLink);
      params.push(link.LinkId);
      params.push(link.Type);
    });
    return params;
  }

  async get(
    type: SPYFileType,
    page: number,
    pageSize: number
  ): Promise<{ records: ScrapedAssetDBO[]; count: number }> {
    try {
      const queryResult = await this.db.executeQuery<
        (ScrapedAssetDBO | RowCountDBO)[][]
      >(
        {
          queryText: `CALL udsp_ScrappedAsset_Retrieve(?, ?, ?);`,
          queryParams: [type, (page - 1) * pageSize, pageSize],
        },
        true
      );
      return {
        records: queryResult.results[0] as ScrapedAssetDBO[],
        count: (queryResult.results[1] as RowCountDBO[])[0].Count,
      };
    } catch (e) {
      throw e;
    }
  }
}

export default ScrapedAssetRepo;
