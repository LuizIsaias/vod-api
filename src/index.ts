import express from "express";
import { config } from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./database/AppDataSource";
import  setupRoutes  from "./api";

config();

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Banco de dados conectado com sucesso.");

    const app = express();
    app.use(express.json());

    setupRoutes(app);

    app.get("/health", (_req, res) => {
      res.send("API funcionando ");
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
  }
};

startServer();
