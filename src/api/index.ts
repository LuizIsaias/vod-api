import { Express } from 'express';
import publicRoutes from './public';
import adminRoutes from '../admin/sync'; // ou outro nome, se for o caso

export function setupRoutes(app: Express) {
  app.use(publicRoutes);
  app.use(adminRoutes);
}
