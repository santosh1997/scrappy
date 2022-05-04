import { SPYAuthenticatorType } from "./authenticator.type";
import PrivateAuthenticator from "./privateAuthenticator/PrivateAuthenticator";
import PublicAuthenticator from "./publicAuthenticator/PublicAuthenticator";

const Authenticator = {
  [SPYAuthenticatorType.PUBLIC]: PublicAuthenticator,
  [SPYAuthenticatorType.PRIVATE]: PrivateAuthenticator,
};

export default Authenticator;
