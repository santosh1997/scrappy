import { SPYBaseServiceProps } from "../../service/base/SPYBaseService.type";
import { SPYBaseControllerProps } from "./SPYBaseController.type";

class SPYBaseContoller {
  props: SPYBaseControllerProps;
  constructor(props: SPYBaseControllerProps) {
    this.props = props;
  }
  get serviceProps(): SPYBaseServiceProps {
    return this.props;
  }
}

export default SPYBaseContoller;
