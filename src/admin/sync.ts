import { Router } from "express";
import { syncXtream } from "../services/syncXtream"; 

const router = Router();

router.post("/admin/sync", async (_, res) => {
  try {
    await syncXtream(); 
    res.json({ message: "Sincronização iniciada com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao sincronizar." });
  }
});

export default router;
