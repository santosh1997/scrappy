import { SPYErrorResponse } from "./errorHandler.type";

const defaultErrorResponse: SPYErrorResponse = {
  status: 500,
  name: "SPYError",
  message: "Something went wrong please contact the administrator",
};

export { defaultErrorResponse };
