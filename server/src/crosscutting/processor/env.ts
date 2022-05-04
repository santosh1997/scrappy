import dotenv from "dotenv";
const getEnvVar = (() => {
  dotenv.config({
    path: `${__dirname}/../../..${process.env.SPY_DOTENV_CONFIG_PATH}`,
  });

  return (key: string): string => {
    return process.env[key] || "";
  };
})();

export default getEnvVar;
