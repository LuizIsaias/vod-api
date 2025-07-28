import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { VodItem } from "../database/entities/VodItem";
import { VodCategory } from "../database/entities/VodCategory";
import { ILike } from "typeorm";

const router = Router();

// GET /v1/movies?q=&category_id=&year=&min_rating=
router.get("/v1/movies", async (req, res) => {
  const { q, category_id, year, min_rating, page = 1, limit = 20 } = req.query;
  const take = Number(limit) || 20;
  const skip = (Number(page) - 1) * take;

  const repo = AppDataSource.getRepository(VodItem);
  const query = repo.createQueryBuilder("movie")
    .leftJoinAndSelect("movie.category", "category")
    .leftJoinAndSelect("movie.tmdbMovie", "tmdb")
    .skip(skip)
    .take(take);

  if (q) query.andWhere("LOWER(movie.titleNormalized) LIKE :q", { q: `%${String(q).toLowerCase()}%` });
  if (category_id) query.andWhere("category.id = :category_id", { category_id });
  if (year) query.andWhere("substr(tmdb.releaseDate, 1, 4) = :year", { year });
  if (min_rating) query.andWhere("tmdb.voteAverage >= :rating", { rating: Number(min_rating) });

  const [data, total] = await query.getManyAndCount();
  res.json({ total, page: Number(page), per_page: take, data });
});

// GET /v1/movies/:id
router.get("/v1/movies/:id", async (req, res) => {
  const repo = AppDataSource.getRepository(VodItem);
  const movie = await repo.findOne({
    where: { id: Number(req.params.id) },
    relations: ["category", "tmdbMovie", "candidates"],
  });
  if (!movie) return res.status(404).json({ error: "Movie not found" });

  res.json(movie);
});

export default router;
