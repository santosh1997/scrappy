import { SPYUser } from "../../crosscutting/authenticator/authenticator.type";
import { RowDataPacket } from "mysql2";

interface SPYBaseRepoProps {
  userContext: SPYUser;
}

interface RowCountDBO extends RowDataPacket {
  Count: number;
}

export { SPYBaseRepoProps, RowCountDBO };
