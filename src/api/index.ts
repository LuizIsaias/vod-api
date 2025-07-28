import { Express } from "express";
import adminRoutes from "../admin/sync";
import moviesRoutes from "./movies";

const setupRoutes = (app: Express) => {
  app.use("/admin", adminRoutes);
  app.use("/movies", moviesRoutes); 
};

export default setupRoutes;
