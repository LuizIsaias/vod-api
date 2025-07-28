"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const syncXtream_1 = require("../services/syncXtream");
const router = (0, express_1.Router)();
router.post("/admin/sync", async (_, res) => {
    try {
        await (0, syncXtream_1.syncXtream)();
        res.json({ message: "Sincronização iniciada com sucesso." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao sincronizar." });
    }
});
exports.default = router;
