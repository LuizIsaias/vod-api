"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTitle = normalizeTitle;
exports.searchMovie = searchMovie;
exports.getMovieDetails = getMovieDetails;
const axios_1 = __importDefault(require("axios"));
const redis_1 = require("../config/redis");
const TMDB_KEY = process.env.TMDB_KEY;
const TMDB_API = "https://api.themoviedb.org/3";
function normalizeTitle(title) {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}
async function searchMovie(title, year) {
    const cacheKey = `tmdb:search:${title}:${year || "any"}`;
    const cached = await redis_1.redisClient.get(cacheKey);
    if (cached)
        return JSON.parse(cached);
    const url = `${TMDB_API}/search/movie?api_key=${TMDB_KEY}&language=pt-BR&query=${encodeURIComponent(title)}${year ? `&year=${year}` : ""}`;
    const { data } = await axios_1.default.get(url);
    await redis_1.redisClient.setex(cacheKey, 86400, JSON.stringify(data));
    return data;
}
async function getMovieDetails(tmdbId) {
    const cacheKey = `tmdb:movie:${tmdbId}`;
    const cached = await redis_1.redisClient.get(cacheKey);
    if (cached)
        return JSON.parse(cached);
    const url = `${TMDB_API}/movie/${tmdbId}?api_key=${TMDB_KEY}&language=pt-BR`;
    const { data } = await axios_1.default.get(url);
    await redis_1.redisClient.setex(cacheKey, 86400, JSON.stringify(data));
    return data;
}
