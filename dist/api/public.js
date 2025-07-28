"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppDataSource_1 = require("../database/AppDataSource");
const VodItem_1 = require("../database/entities/VodItem");
const VodCategory_1 = require("../database/entities/VodCategory");
const typeorm_1 = require("typeorm");
const router = (0, express_1.Router)();
router.get('/v1/categories', async (_req, res) => {
    const repo = AppDataSource_1.AppDataSource.getRepository(VodCategory_1.VodCategory);
    const categories = await repo.find();
    res.json(categories);
});
router.get('/v1/movies', async (req, res) => {
    const { q, category_id, year, min_rating, page = 1, limit = 20 } = req.query;
    const repo = AppDataSource_1.AppDataSource.getRepository(VodItem_1.VodItem);
    const where = {};
    if (q) {
        where.titleNormalized = (0, typeorm_1.ILike)(`%${q.toString().toLowerCase()}%`);
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
router.get('/v1/movies/:id', async (req, res) => {
    const repo = AppDataSource_1.AppDataSource.getRepository(VodItem_1.VodItem);
    const item = await repo.findOne({
        where: { id: Number(req.params.id) },
        relations: ['category', 'tmdbMovie'],
    });
    if (!item) {
        return res.status(404).json({ error: 'Filme não encontrado' });
    }
    res.json(item);
});
exports.default = router;
