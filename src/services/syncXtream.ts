import axios from 'axios';
import { AppDataSource } from '../database/AppDataSource';
import { VodItem } from '../database/entities/VodItem';
import { VodCategory } from '../database/entities/VodCategory';
import { TmdbMovie } from '../database/entities/TmdbMovie';
import { TmdbCandidate } from '../database/entities/TmdbCandidate';
import { SyncRun } from '../database/entities/SyncRun';
import Redis from 'ioredis';

const redis = new Redis();

const BASE_URL = 'https://test.proxroute.sbs/player_api.php';
const USERNAME = '885533';
const PASSWORD = '885533';

const getXtreamData = async (action: string, extraParams: Record<string, string> = {}) => {
  const params = new URLSearchParams({
    username: USERNAME,
    password: PASSWORD,
    action,
    ...extraParams
  });

  const url = `${BASE_URL}?${params.toString()}`;
  const response = await axios.get(url);
  return response.data;
};

export const syncXtream = async () => {
  const lockKey = 'sync_lock';
  const isLocked = await redis.get(lockKey);

  if (isLocked) {
    console.log('🔒 Já existe uma sincronização em andamento.');
    return;
  }

  await (redis as any).set(lockKey, 'locked', { EX: 300, NX: true });

  const categoryRepo = AppDataSource.getRepository(VodCategory);
  const vodRepo = AppDataSource.getRepository(VodItem);

  try {
    console.log('🚀 Iniciando sincronização Xtream...');

    const xtreamCategories = await getXtreamData('get_vod_categories');
    const xtreamStreams = await getXtreamData('get_vod_streams');

    for (const cat of xtreamCategories) {
      await categoryRepo.upsert(
        {
          xtreamCategoryId: parseInt(cat.category_id),
          name: cat.category_name
        },
        ['xtreamCategoryId']
      );
    }

    // ✅ Prepara um Map temporário com categoria ID
    const itemsToInsert: Partial<VodItem>[] = [];
    const categoryMap = new Map<Partial<VodItem>, number>();

    for (const item of xtreamStreams) {
      const vod: Partial<VodItem> = {
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
        item.category = category!;
      }
    }

    await vodRepo.upsert(itemsToInsert, ['xtreamVodId']);

    console.log(`✅ Sincronização finalizada com ${itemsToInsert.length} filmes.`);

  } catch (error) {
    console.error('❌ Erro durante sincronização:', error);
  } finally {
    await redis.del(lockKey);
  }
};
