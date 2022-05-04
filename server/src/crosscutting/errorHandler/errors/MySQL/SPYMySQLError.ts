import { defaultErrorResponse } from "../../errorHandler.contant";
import SPYError from "../SPYError";

class SPYMySQLError extends SPYError {
  constructor(error: NodeJS.ErrnoException) {
    super({
      name: "SPYMySQLError",
      status: 500,
      message: defaultErrorResponse.message,
      additionalData: JSON.stringify(error),
    });
  }
}

export default SPYMySQLError;
