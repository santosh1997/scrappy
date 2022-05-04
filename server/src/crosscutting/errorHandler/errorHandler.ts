import { defaultErrorResponse } from "./errorHandler.contant";
import { SPYErrorResponse } from "./errorHandler.type";
import SPYError from "./errors/SPYError";

const handleSPYError = (e: SPYError) => {
  console.error(`[SPY_ERROR:${e.name}:${e.message}]`, {
    stack: e.stack,
    additionalData: e.additionalData,
  });
  return e.getErrorResponse();
};

const errorHandler = (e: unknown): SPYErrorResponse => {
  if (e instanceof Error) {
    if (e instanceof SPYError) return handleSPYError(e);

    console.error(`[SYSTEM_ERROR:${e.name}:${e.message}]`, {
      stack: e.stack,
    });
    return {
      status: defaultErrorResponse.status,
      name: e.name,
      message: defaultErrorResponse.message,
    };
  } else return defaultErrorResponse;
};

export default errorHandler;
