import { Request } from "express";
import { SPYBaseControllerProps } from "../../api/base/SPYBaseController.type";

interface SPYAuthenticatedRequest extends Request {
  ServiceUser: SPYUser;
}

interface SPYUser {
  userId: string;
}

type SPYAuthenticator = <ResponseType>(
  req: Request,
  callback: (baseControllerProps: SPYBaseControllerProps) => ResponseType
) => void;

enum SPYAuthenticatorType {
  PUBLIC = "public",
  PRIVATE = "private",
}

export {
  SPYAuthenticatedRequest,
  SPYUser,
  SPYAuthenticator,
  SPYAuthenticatorType,
};
