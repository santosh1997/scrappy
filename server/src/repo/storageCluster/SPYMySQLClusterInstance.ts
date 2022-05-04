import SPYMySQLCluster from "./SPYMySQLCluster";

const SPYMySQLClusterInstance = (() => {
  const clusterInstance = new SPYMySQLCluster();
  return clusterInstance;
})();

export default SPYMySQLClusterInstance;
