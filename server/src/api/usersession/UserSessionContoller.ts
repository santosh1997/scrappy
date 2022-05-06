import { Request } from "express";
import Encryptor from "../../crosscutting/encryptor/encryptor";
import UserSessionService from "../../service/usersession/UserSessionService";
import SPYBaseContoller from "../base/SPYBaseController";
import { SPYBaseControllerProps } from "../base/SPYBaseController.type";
import {
  SignInRequestDTO,
  SafeSignInRequestDTO,
  SignInResponseDTO,
} from "./UserSessionController.type";

class UserSessionController extends SPYBaseContoller {
  userSessionService: UserSessionService;

  constructor(props: SPYBaseControllerProps) {
    super(props);
    this.userSessionService = new UserSessionService(this.serviceProps);
  }

  async signIn(
    request: Request<{}, {}, SignInRequestDTO>
  ): Promise<SignInResponseDTO> {
    try {
      const userSession = await this.userSessionService.create(
        request.body.email,
        request.body.password
      );
      return {
        token: Encryptor.encrypt(userSession.sessionId),
      };
    } catch (e) {
      throw e;
    }
  }

  async safeSignIn(
    request: Request<{}, {}, SafeSignInRequestDTO>
  ): Promise<SignInResponseDTO> {
    try {
      const { email, password }: SignInRequestDTO = JSON.parse(
        Encryptor.decryptClientEncryption(request.body.payload)
      );
      const userSession = await this.userSessionService.create(email, password);
      return {
        token: Encryptor.encrypt(userSession.sessionId),
      };
    } catch (e) {
      throw e;
    }
  }
}

export default UserSessionController;
