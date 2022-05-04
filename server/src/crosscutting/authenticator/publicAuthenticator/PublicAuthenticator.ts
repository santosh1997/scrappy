import { Request } from "express";
import { SPYBaseControllerProps } from "../../../api/base/SPYBaseController.type";
import { SPYUser } from "../authenticator.type";

const PublicAuthenticator: <ResponseType>(
  req: Request,
  callback: (props: SPYBaseControllerProps) => Promise<ResponseType>
) => Promise<ResponseType> = (() => {
  return async (req, callback) => {
    const userDetails: SPYUser = { userId: "{{__SYSTEM_USER__}}" };
    return callback({ userContext: userDetails });
  };
})();

export default PublicAuthenticator;
