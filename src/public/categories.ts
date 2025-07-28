import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { VodCategory } from "../database/entities/VodCategory";

const router = Router();

router.get("/v1/categories", async (_req, res) => {
  const repo = AppDataSource.getRepository(VodCategory);
  const categories = await repo.find();
  res.json(categories);
});

export default router;
