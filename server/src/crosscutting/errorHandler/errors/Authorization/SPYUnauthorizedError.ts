import SPYError from "../SPYError";

class SPYUnauthorizedError extends SPYError {
  constructor(message: string, additionalData?: string) {
    super({
      name: "SPYUnauthorizedError",
      status: 401,
      message: message,
      additionalData: additionalData,
    });
  }
}

export default SPYUnauthorizedError;
