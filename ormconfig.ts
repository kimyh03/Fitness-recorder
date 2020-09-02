import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_ENDPOINT,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "FitnessRecorder",
  entities: ["./src/entities/*.ts"],
  synchronize: true,
  logging: true,
};

export default connectionOptions;
