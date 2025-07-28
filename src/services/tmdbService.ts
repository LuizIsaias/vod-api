import axios from "axios";
import { redisClient } from "../config/redis";

const TMDB_KEY = process.env.TMDB_KEY;
const TMDB_API = "https://api.themoviedb.org/3";

export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export async function searchMovie(title: string, year?: number) {
  const cacheKey = `tmdb:search:${title}:${year || "any"}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const url = `${TMDB_API}/search/movie?api_key=${TMDB_KEY}&language=pt-BR&query=${encodeURIComponent(
    title
  )}${year ? `&year=${year}` : ""}`;

  const { data } = await axios.get(url);
  await redisClient.setex(cacheKey, 86400, JSON.stringify(data));
  return data;
}

export async function getMovieDetails(tmdbId: number) {
  const cacheKey = `tmdb:movie:${tmdbId}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const url = `${TMDB_API}/movie/${tmdbId}?api_key=${TMDB_KEY}&language=pt-BR`;
  const { data } = await axios.get(url);
  await redisClient.setex(cacheKey, 86400, JSON.stringify(data));
  return data;
}