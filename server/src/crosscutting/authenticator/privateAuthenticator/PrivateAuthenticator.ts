import { Request } from "express";
import { SPYBaseControllerProps } from "../../../api/base/SPYBaseController.type";
import UserSessionService from "../../../service/usersession/UserSessionService";
import Encryptor from "../../encryptor/encryptor";
import SPYUnauthorizedError from "../../errorHandler/errors/Authorization/SPYUnauthorizedError";
import { SPYUser } from "../authenticator.type";

const PrivateAuthenticator: <ResponseType>(
  req: Request,
  callback: (props: SPYBaseControllerProps) => Promise<ResponseType>
) => Promise<ResponseType> = (() => {
  const userSessionService = new UserSessionService({
    userContext: { userId: "{{__SYSTEM_USER__}}" },
  });
  const getUserDetails = async (req: Request): Promise<SPYUser> => {
    const authHeader = req.headers["authorization"] || "";
    if (!authHeader)
      throw new SPYUnauthorizedError("Authorization not provided");
    const sessionId = Encryptor.decrypt(authHeader);
    const userSession = await userSessionService.get(sessionId);
    return { userId: userSession.userId };
  };

  return async (req, callback) => {
    try {
      const userDetails = await getUserDetails(req);
      return callback({ userContext: userDetails });
    } catch (e) {
      throw e;
    }
  };
})();

export default PrivateAuthenticator;
