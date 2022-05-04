import { RowDataPacket } from "mysql2";

interface ScrapableLinkDBO extends RowDataPacket {
  Id: string;
  ProcessId: string;
  Link: string;
}

export { ScrapableLinkDBO };
