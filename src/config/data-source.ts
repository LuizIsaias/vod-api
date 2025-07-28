import "reflect-metadata";
import { DataSource } from "typeorm";

import { VodCategory } from "../database/entities/VodCategory";
import { VodItem } from "../database/entities/VodItem";
import { TmdbMovie } from "../database/entities/TmdbMovie";
import { TmdbCandidate } from "../database/entities/TmdbCandidate";
import { SyncRun } from "../database/entities/SyncRun";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "vod.db",
  synchronize: false,
  logging: true,
  entities: [VodCategory, VodItem, TmdbMovie, TmdbCandidate, SyncRun],
  migrations: ["src/database/migrations/*.ts"],
});
