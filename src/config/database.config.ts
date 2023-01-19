import { DataSource } from "typeorm";
import { envConfig } from "./envConfig";

export const connectDB = () => {
  return new Promise((resolve, reject) => {
    try {
      const datasource = new DataSource({
        port: envConfig.dbPort,
        database: envConfig.dbName,
        username: envConfig.dbUser,
        password: envConfig.dbPass,
        host: envConfig.dbHost,
        synchronize: envConfig.dbSync,
        type: envConfig.dbType,
      });

      if (datasource.isInitialized) {
        return resolve("connect");
      } else return reject("database not connect");
    } catch (error) {
      return reject("database not connect");
    }
  });
};
