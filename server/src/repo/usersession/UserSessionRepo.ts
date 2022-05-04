import SPYBaseRepo from "../base/SPYBaseRepo";
import { SPYBaseRepoProps } from "../base/SPYBaseRepo.type";
import { UserSessionDBO } from "./UserSession.types";
import { QueryError } from "mysql2";
import SPYUnauthorizedError from "../../crosscutting/errorHandler/errors/Authorization/SPYUnauthorizedError";
import SPYMySQLQueryError from "../../crosscutting/errorHandler/errors/MySQL/SPYMySQLQueryError";

class UserSessionRepo extends SPYBaseRepo {
  constructor(props: SPYBaseRepoProps) {
    super(props);
  }

  async create(email: string, password: string): Promise<UserSessionDBO> {
    try {
      const queryResult = await this.db.executeCommand<UserSessionDBO[][]>(
        {
          queryText: `CALL udsp_UserSession_Create(?, ?);`,
          queryParams: [email, password],
        },
        true
      );
      return queryResult.results[0][0];
    } catch (e) {
      if (e instanceof SPYMySQLQueryError && e.additionalData) {
        const errorData = JSON.parse(e.additionalData) as QueryError;
        if (errorData.errno === 1045)
          e = new SPYUnauthorizedError("Invalid Credentials", e.additionalData);
      }
      throw e;
    }
  }

  async get(id: string): Promise<UserSessionDBO> {
    try {
      const queryResult = await this.db.executeQuery<UserSessionDBO[]>(
        {
          queryText:
            "SELECT US.`Id` as `SessionId`, US.`UserId` FROM `UserSession` AS US INNER JOIN `User` AS U ON (US.`UserId` = U.`Id`) WHERE US.`Id` = ? AND (US.`LoggedOutOn` IS NULL OR US.`LoggedOutOn` > UTC_TIMESTAMP());",
          queryParams: [id],
        },
        false
      );

      if (queryResult.results && queryResult.results.length)
        return queryResult.results[0];
      else throw new SPYUnauthorizedError("Invalid Session");
    } catch (e) {
      throw e;
    }
  }
}

export default UserSessionRepo;
