import SPYError from "../SPYError";

class SPYInvalidLinkError extends SPYError {
  constructor(message: string) {
    super({
      name: "SPYInvalidLinkError",
      status: 400,
      message: message,
    });
  }
}

export default SPYInvalidLinkError;
