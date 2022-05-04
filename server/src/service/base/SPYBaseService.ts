import { SPYBaseRepoProps } from "../../repo/base/SPYBaseRepo.type";
import { SPYBaseServiceProps } from "./SPYBaseService.type";

class SPYBaseService {
  props: SPYBaseServiceProps;
  constructor(props: SPYBaseServiceProps) {
    this.props = props;
  }

  get repoProps(): SPYBaseRepoProps {
    return this.props;
  }
}

export default SPYBaseService;
