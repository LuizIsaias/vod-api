"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncXtream = void 0;
const axios_1 = __importDefault(require("axios"));
const AppDataSource_1 = require("../database/AppDataSource");
const VodItem_1 = require("../database/entities/VodItem");
const VodCategory_1 = require("../database/entities/VodCategory");
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
const BASE_URL = 'https://test.proxroute.sbs/player_api.php';
const USERNAME = '885533';
const PASSWORD = '885533';
const getXtreamData = async (action, extraParams = {}) => {
    const params = new URLSearchParams({
        username: USERNAME,
        password: PASSWORD,
        action,
        ...extraParams
    });
    const url = `${BASE_URL}?${params.toString()}`;
    const response = await axios_1.default.get(url);
    return response.data;
};
const syncXtream = async () => {
    const lockKey = 'sync_lock';
    const isLocked = await redis.get(lockKey);
    if (isLocked) {
        console.log('🔒 Já existe uma sincronização em andamento.');
        return;
    }
    await redis.set(lockKey, 'locked', { EX: 300, NX: true });
    const categoryRepo = AppDataSource_1.AppDataSource.getRepository(VodCategory_1.VodCategory);
    const vodRepo = AppDataSource_1.AppDataSource.getRepository(VodItem_1.VodItem);
    try {
        console.log('🚀 Iniciando sincronização Xtream...');
        const xtreamCategories = await getXtreamData('get_vod_categories');
        const xtreamStreams = await getXtreamData('get_vod_streams');
        for (const cat of xtreamCategories) {
            await categoryRepo.upsert({
                xtreamCategoryId: parseInt(cat.category_id),
                name: cat.category_name
            }, ['xtreamCategoryId']);
        }
        // ✅ Prepara um Map temporário com categoria ID
        const itemsToInsert = [];
        const categoryMap = new Map();
        for (const item of xtreamStreams) {
            const vod = {
                xtreamVodId: item.stream_id,
                titleOriginal: item.name,
                titleNormalized: item.name.toLowerCase(),
                streamIcon: item.stream_icon,
                addedAtXtream: new Date(parseInt(item.added) * 1000),
                containerExtension: item.container_extension
            };
            itemsToInsert.push(vod);
            categoryMap.set(vod, parseInt(item.category_id));
        }
        // ✅ Atribui as entidades de categoria
        for (const item of itemsToInsert) {
            const categoryId = categoryMap.get(item);
            if (categoryId) {
                const category = await categoryRepo.findOneBy({ xtreamCategoryId: categoryId });
                item.category = category;
            }
        }
        await vodRepo.upsert(itemsToInsert, ['xtreamVodId']);
        console.log(`✅ Sincronização finalizada com ${itemsToInsert.length} filmes.`);
    }
    catch (error) {
        console.error('❌ Erro durante sincronização:', error);
    }
    finally {
        await redis.del(lockKey);
    }
};
exports.syncXtream = syncXtream;
