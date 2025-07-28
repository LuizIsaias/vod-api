import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { VodItem } from "../database/entities/VodItem";

const router = Router();

router.get("/", async (req, res) => {
  const {
    category_id,
    q,
    order_by = "addedAtXtream",
    order = "desc",
    page = 1,
    limit = 20,
  } = req.query as {
    category_id?: string;
    q?: string;
    order_by?: keyof VodItem;
    order?: "asc" | "desc";
    page?: string | number;
    limit?: string | number;
  };

  const take = Number(limit);
  const skip = (Number(page) - 1) * take;

  const repo = AppDataSource.getRepository(VodItem);

  const query = repo
    .createQueryBuilder("vod")
    .leftJoinAndSelect("vod.category", "category")
    .leftJoinAndSelect("vod.tmdbMovie", "tmdb")
    .skip(skip)
    .take(take)
    .orderBy(`vod.${order_by}`, order.toUpperCase() as "ASC" | "DESC");

  if (category_id) query.andWhere("vod.category_id = :category_id", { category_id });
  if (q) query.andWhere("LOWER(vod.titleNormalized) LIKE :q", { q: `%${q.toLowerCase()}%` });

  const [result, total] = await query.getManyAndCount();

  res.json({
    total,
    page: Number(page),
    per_page: take,
    data: result.map((vod) => ({
      id: vod.id,
      title: vod.titleOriginal,
      category: vod.category?.name,
      stream_icon: vod.streamIcon,
      added_at: vod.addedAtXtream,
      tmdb: vod.tmdbMovie
        ? {
            tmdb_id: vod.tmdbMovie.tmdbId,
            title: vod.tmdbMovie.originalTitle,
            poster: vod.tmdbMovie.posterPath,
            rating: vod.tmdbMovie.voteAverage,
          }
        : null,
    })),
  });
});

export default router;
