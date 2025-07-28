"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
require("reflect-metadata");
const AppDataSource_1 = require("./database/AppDataSource");
const api_1 = require("./api");
(0, dotenv_1.config)();
const startServer = async () => {
    try {
        await AppDataSource_1.AppDataSource.initialize();
        console.log("📦 Banco de dados conectado com sucesso.");
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        (0, api_1.setupRoutes)(app);
        app.get("/health", (_req, res) => {
            res.send("API funcionando ");
        });
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Erro ao iniciar o servidor:", error);
    }
};
startServer();
