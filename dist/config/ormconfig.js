"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VodItem_1 = require("../database/entities/VodItem"); // você criará em breve
const config = {
    type: "sqlite",
    database: "./vod.db",
    entities: [VodItem_1.VodItem],
    synchronize: false,
    migrations: ["src/database/migrations/*.ts"],
};
exports.default = config;
