"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const VodCategory_1 = require("../database/entities/VodCategory");
const VodItem_1 = require("../database/entities/VodItem");
const TmdbMovie_1 = require("../database/entities/TmdbMovie");
const TmdbCandidate_1 = require("../database/entities/TmdbCandidate");
const SyncRun_1 = require("../database/entities/SyncRun");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "vod.db",
    synchronize: false,
    logging: true,
    entities: [VodCategory_1.VodCategory, VodItem_1.VodItem, TmdbMovie_1.TmdbMovie, TmdbCandidate_1.TmdbCandidate, SyncRun_1.SyncRun],
    migrations: ["src/database/migrations/*.ts"],
});
