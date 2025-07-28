import { ConnectionOptions } from "typeorm";
import { VodItem } from "../database/entities/VodItem"; // você criará em breve

const config: ConnectionOptions = {
  type: "sqlite",
  database: "./vod.db",
  entities: [VodItem],
  synchronize: false,
  migrations: ["src/database/migrations/*.ts"],
};

export default config;
