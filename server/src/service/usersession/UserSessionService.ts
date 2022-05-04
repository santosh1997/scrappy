import UserSessionRepo from "../../repo/usersession/UserSessionRepo";
import SPYBaseService from "../base/SPYBaseService";
import { SPYBaseServiceProps } from "../base/SPYBaseService.type";
import { UserSession } from "./UserSessionService.type";

class UserSessionService extends SPYBaseService {
  userSession: UserSessionRepo;

  constructor(props: SPYBaseServiceProps) {
    super(props);
    this.userSession = new UserSessionRepo(this.repoProps);
  }

  async create(email: string, password: string): Promise<UserSession> {
    try {
      const userSessionDBO = await this.userSession.create(email, password);
      return {
        sessionId: userSessionDBO.SessionId,
        userId: userSessionDBO.UserId,
      };
    } catch (e) {
      throw e;
    }
  }

  async get(id: string): Promise<UserSession> {
    try {
      const userSessionDBO = await this.userSession.get(id);
      return {
        sessionId: userSessionDBO.SessionId,
        userId: userSessionDBO.UserId,
      };
    } catch (e) {
      throw e;
    }
  }
}

export default UserSessionService;
