import mysql, { RowDataPacket, ResultSetHeader } from "mysql2";
import SPYMySQLError from "../../crosscutting/errorHandler/errors/MySQL/SPYMySQLError";
import SPYMySQLQueryError from "../../crosscutting/errorHandler/errors/MySQL/SPYMySQLQueryError";
import { getEnvVar } from "../../crosscutting/processor";
import parseOrDefault, {
  valueType,
} from "../../crosscutting/utils/dataFormatter/parseOrDefault";
import { QueryResult, SQLQuery } from "./SPYStorageCluster.type";

class SPYMySQLCluster {
  private masterPool: mysql.Pool;
  private replicaPool: mysql.Pool[] = [];
  constructor() {
    this.masterPool = this.getPoolInstance("MASTER");
    this.loadReplicaDBs();
  }

  private loadReplicaDBs() {
    const replicaCount = parseOrDefault(
      getEnvVar("DB_REPLICA_COUNT") || "",
      0,
      valueType.INTEGER
    );

    for (let i = 1; i <= replicaCount; i++) {
      this.replicaPool.push(this.getPoolInstance(`REPLICA_${i}`));
    }
  }

  private getPoolInstance(instanceName: string): mysql.Pool {
    const host = getEnvVar(`DB_${instanceName}_HOST`) || "",
      port = parseOrDefault(
        getEnvVar(`DB_${instanceName}_PORT`) || "",
        1000,
        valueType.INTEGER
      ),
      database = getEnvVar(`DB_${instanceName}_NAME`) || "",
      user = getEnvVar(`DB_${instanceName}_USERNAME`) || "",
      password = getEnvVar(`DB_${instanceName}_PASSWORD`) || "",
      connectionLimit = parseOrDefault(
        getEnvVar(`DB_${instanceName}_CONN_LIMIT`) || "",
        10,
        valueType.INTEGER
      );

    return mysql.createPool({
      host,
      port,
      database,
      user,
      password,
      connectionLimit,
    });
  }

  private getReadOnlyPool = (() => {
    let index = 0;

    return () => {
      // getting the replica pool by round robin is replicas exists
      if (this.replicaPool.length)
        return this.replicaPool[index++ % this.replicaPool.length];
      else return this.masterPool;
    };
  })();

  private run(
    query: SQLQuery,
    isWrite: boolean,
    segregarteResultSetHeader: boolean
  ): QueryResult<RowDataPacket[][] | RowDataPacket[]> {
    return new Promise((resolve, reject) => {
      const pool = isWrite ? this.masterPool : this.getReadOnlyPool();
      pool.getConnection((error, connection) => {
        connection.release();
        if (error) reject(new SPYMySQLError(error));
        else
          connection.query<RowDataPacket[][] | RowDataPacket[]>(
            query.queryText,
            query.queryParams,
            (queryError, results) => {
              if (queryError) reject(new SPYMySQLQueryError(queryError));
              else {
                const resultSetHeader = segregarteResultSetHeader
                  ? (results.pop() as unknown as ResultSetHeader)
                  : ({} as ResultSetHeader);
                resolve({
                  resultSetHeader,
                  results,
                });
              }
            }
          );
      });
    });
  }

  executeQuery<T extends RowDataPacket[][] | RowDataPacket[]>(
    query: SQLQuery,
    segregarteResultSetHeader: boolean
  ): QueryResult<T> {
    return this.run(query, false, segregarteResultSetHeader) as QueryResult<T>;
  }

  executeCommand<T extends RowDataPacket[][] | RowDataPacket[]>(
    query: SQLQuery,
    segregarteResultSetHeader: boolean
  ): QueryResult<T> {
    return this.run(query, true, segregarteResultSetHeader) as QueryResult<T>;
  }
}

export default SPYMySQLCluster;
