import { RowDataPacket } from "mysql2";

interface UserDBO extends RowDataPacket {
  Id: string;
}

export { UserDBO };
