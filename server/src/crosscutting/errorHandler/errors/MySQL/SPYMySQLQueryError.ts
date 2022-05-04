import { defaultErrorResponse } from "../../errorHandler.contant";
import SPYError from "../SPYError";
import mysql from "mysql2";

class SPYMySQLQueryError extends SPYError {
  constructor(error: mysql.QueryError) {
    super({
      name: "SPYMySQLQueryError",
      status: 500,
      message: defaultErrorResponse.message,
      additionalData: JSON.stringify(error),
    });
  }
}

export default SPYMySQLQueryError;
