import { DataSource } from "typeorm";
import { join } from "path";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "demo_db",
  synchronize: true,
  logging: false,
  entities: [join(__dirname, "..", "src", "entity", "*.{ts,js}")],
  migrations: [],
  subscribers: [],
  dropSchema: false,
});