import { History } from "history";
import { AUTH_TOKEN_STORAGE_KEY, LOGIN_PATH } from "./PrivateRoute.contant";

const withAuthentication = (
  component: JSX.Element,
  history: History
): JSX.Element => {
  const authToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || "";
  if (!authToken) history.push(LOGIN_PATH);
  return component;
};

export default withAuthentication;