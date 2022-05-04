import UserService from "../../service/user/UserService";
import SPYBaseContoller from "../base/SPYBaseController";
import { SPYBaseControllerProps } from "../base/SPYBaseController.type";
import { UserDTO } from "./UserController.type";

class UserController extends SPYBaseContoller {
  userService: UserService;

  constructor(props: SPYBaseControllerProps) {
    super(props);
    this.userService = new UserService(this.serviceProps);
  }

  async getAll(): Promise<UserDTO[]> {
    try {
      return this.userService.getAll();
    } catch (e) {
      throw e;
    }
  }
}

export default UserController;
