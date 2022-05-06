import { message } from "antd";
import { AUTH_TOKEN_STORAGE_KEY } from "../../components/Route/PrivateRoute/PrivateRoute.contant";
import {
  APIError,
  AuthType,
  ContentType,
  Request,
  RequestType,
} from "./serviceConsumer.type";

const ServiceConsumer = (() => {
  const setHeader = (fetchOptions: RequestInit, key: string, value: string) => {
    if (!fetchOptions.headers) fetchOptions.headers = {};
    (fetchOptions.headers as { [key: string]: string })[key] = value;
  };
  const getFetchOptions = (request: Request): RequestInit => {
    const options: RequestInit = { headers: {} };
    if (request.authType === AuthType.PRIVATE) {
      setHeader(
        options,
        "authorization",
        localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || ""
      );
    }
    if (request.type === RequestType.POST) {
      options.method = request.type;
      setHeader(options, "Content-Type", request.content);
      if (request.content === ContentType.JSON)
        options.body = JSON.stringify(request.data);
      else if (request.content === ContentType.FORM_DATA)
        options.body = request.data;
    }
    return options;
  };
  return {
    callService: async <ResponseDataType>(
      request: Request
    ): Promise<ResponseDataType | undefined> => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_CORE_API_BASE_URL}${request.relativeURL}`,
          getFetchOptions(request)
        );
        if (response.status === 200)
          return (await response.json()) as ResponseDataType;
        else {
          const APIError: APIError = await response.json();
          message.error(APIError.message);
        }
      } catch (e) {
        console.error(e);
      }
    },
  };
})();

export default ServiceConsumer;
