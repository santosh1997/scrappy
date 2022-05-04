import { RowDataPacket } from "mysql2";

interface ScrapedAssetDBO extends RowDataPacket {
  AssetLink: string;
  LinkId: string;
  Type: SPYFileType;
}

enum SPYFileType {
  Any = -1,
  Image = 0,
  Video = 1,
}

export { ScrapedAssetDBO, SPYFileType };
