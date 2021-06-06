import { connect, Connection, connection } from "mongoose";
import configurations from "../../config/configurations";
import IDatabase from "../i-database";

export default class MongooseDatabase implements IDatabase<Connection> {

  public async createConnection(): Promise<void> {
    await connect(MongooseDatabase.getDatabaseUrl(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: configurations.dbUsername,
      pass: configurations.dbPassword,
      poolSize: configurations.dbPoolSize,
      useCreateIndex: true
    });
  }

  public getConnection(): Connection {
    return connection;
  }

  public isConnected(): boolean {
    return this.getConnection().readyState === 1;
  }

  public static getDatabaseUrl(): string {
    return `mongodb://${configurations.dbHost}:${configurations.dbPort}/${configurations.dbName}`;
  }

}
