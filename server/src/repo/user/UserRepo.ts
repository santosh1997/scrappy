import SPYBaseRepo from "../base/SPYBaseRepo";
import { SPYBaseRepoProps } from "../base/SPYBaseRepo.type";
import { UserDBO } from "./UserRepo.types";

class UserRepo extends SPYBaseRepo {
  constructor(props: SPYBaseRepoProps) {
    super(props);
  }
  async getAll(): Promise<UserDBO[]> {
    return [];
  }
}

export default UserRepo;
