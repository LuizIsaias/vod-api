import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { VodItem } from '../database/entities/VodItem';
import { VodCategory } from '../database/entities/VodCategory';
import { ILike } from 'typeorm';

const router = Router();

router.get('/v1/categories', async (_req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(VodCategory);
  const categories = await repo.find();
  res.json(categories);
});

router.get('/v1/movies', async (req: Request, res: Response) => {
  const { q, category_id, year, min_rating, page = 1, limit = 20 } = req.query;
  const repo = AppDataSource.getRepository(VodItem);

  const where: any = {};

  if (q) {
    where.titleNormalized = ILike(`%${q.toString().toLowerCase()}%`);
  }

  if (category_id) {
    where.category = { id: Number(category_id) };
  }

  const [data, total] = await repo.findAndCount({
    where,
    relations: ['category', 'tmdbMovie'],
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  });

  res.setHeader('X-Total-Count', total.toString());
  res.json(data);
});

router.get('/v1/movies/:id', async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(VodItem);
  const item = await repo.findOne({
    where: { id: Number(req.params.id) },
    relations: ['category', 'tmdbMovie'],
  });

  if (!item) {
    return res.status(404).json({ error: 'Filme não encontrado' });
  }

  res.json(item);
});

export default router;
