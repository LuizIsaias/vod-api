"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../config/data-source");
const VodCategory_1 = require("../database/entities/VodCategory");
const router = (0, express_1.Router)();
router.get("/v1/categories", async (_req, res) => {
    const repo = data_source_1.AppDataSource.getRepository(VodCategory_1.VodCategory);
    const categories = await repo.find();
    res.json(categories);
});
exports.default = router;
