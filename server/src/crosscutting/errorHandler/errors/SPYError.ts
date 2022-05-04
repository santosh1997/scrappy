import { SPYErrorResponse } from "../errorHandler.type";
import { SPYErrorInitializerProps } from "./SPYError.type";

class SPYError extends Error {
  status: number;
  additionalData?: string;

  constructor(props: SPYErrorInitializerProps) {
    super(props.message);
    this.status = props.status || 500;
    this.name = props.name || "SPYError";
    this.additionalData = props.additionalData;
  }

  getErrorResponse(): SPYErrorResponse {
    return {
      status: this.status,
      name: this.name,
      message: this.message,
    };
  }
}

export default SPYError;
