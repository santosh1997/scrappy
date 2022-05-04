import SPYMySQLClusterInstance from "../storageCluster";
import SPYMySQLCluster from "../storageCluster/SPYMySQLCluster";
import { SPYBaseRepoProps } from "./SPYBaseRepo.type";

class SPYBaseRepo {
  props: SPYBaseRepoProps;
  db: SPYMySQLCluster;
  constructor(props: SPYBaseRepoProps) {
    this.props = props;
    this.db = SPYMySQLClusterInstance;
  }
}

export default SPYBaseRepo;
