import UserRepo from "../../repo/user/UserRepo";
import SPYBaseService from "../base/SPYBaseService";
import { SPYBaseServiceProps } from "../base/SPYBaseService.type";
import { User } from "./UserService.type";

class UserService extends SPYBaseService {
  user: UserRepo;

  constructor(props: SPYBaseServiceProps) {
    super(props);
    this.user = new UserRepo(this.repoProps);
  }

  async getAll(): Promise<User[]> {
    return this.user.getAll();
  }
}

export default UserService;
