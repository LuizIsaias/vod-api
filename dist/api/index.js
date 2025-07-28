"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = setupRoutes;
const public_1 = __importDefault(require("./public"));
const sync_1 = __importDefault(require("../admin/sync")); // ou outro nome, se for o caso
function setupRoutes(app) {
    app.use(public_1.default);
    app.use(sync_1.default);
}
