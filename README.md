# 🎬 VOD API – Desafio Técnico

Este projeto é uma API REST para gerenciamento e sincronização de catálogos VOD (Video On Demand), utilizando integração com a Xtream API e dados complementares do TMDB (The Movie Database).

---

## 📦 Tecnologias utilizadas

- **Node.js** + **TypeScript**
- **Express**
- **TypeORM** (com migrations)
- **SQLite** (banco local leve)
- **Redis** (cache opcional)
- **TMDB API** (para enriquecer os dados dos filmes)
- **Xtream API** (fonte principal dos dados VOD)

---

## 🚀 Instalação

```bash
git clone https://github.com/LuizIsaias/vod-api.git
cd vod-api
npm install
⚙️ Configuração
Crie um arquivo .env na raiz com as seguintes variáveis:

env
Copiar código
XTREAM_BASE_URL=http://example.com:8080
XTREAM_USERNAME=usuario
XTREAM_PASSWORD=senha
TMDB_API_KEY=sua_chave_tmdb
REDIS_URL=redis://localhost:6379
🧪 Scripts disponíveis
Comando	Descrição
npm run dev	Inicia o servidor em modo desenvolvimento
npm run build	Compila o projeto TypeScript
npm run migration:generate -- nome	Gera uma nova migration
npm run migration:run	Executa as migrations pendentes
npm run migration:revert	Reverte a última migration

🛠 Estrutura do Projeto
bash
Copiar código
src/
├── api/                 # Rotas públicas e administrativas
├── database/
│   ├── entities/        # Entidades TypeORM (TmdbMovie, VodItem, etc)
│   ├── migrations/      # Migrations TypeORM
│   └── AppDataSource.ts # Conexão com o banco
├── services/            # Serviços de sincronização e TMDB
├── utils/               # Funções auxiliares
└── index.ts             # Ponto de entrada da aplicação
🔄 Rotas principais
POST /admin/sync
Sincroniza os filmes e categorias com a API Xtream e o TMDB.

🧠 Lógica de Sincronização
A rota /admin/sync busca as categorias e filmes da API Xtream.

Os filmes são normalizados e salvos em VodItem, associados à VodCategory.

Cada filme tenta encontrar um match com o TMDB.

Quando o match é claro, o filme é vinculado à entidade TmdbMovie.

📁 Banco de dados
Este projeto usa SQLite para facilitar testes locais. Os dados são persistidos no arquivo vod.sqlite.

📌 To-do (possíveis melhorias)
Autenticação e proteção das rotas /admin

Paginação e filtro nas rotas públicas

Upload de imagem do TMDB com cache local

Webhook para sincronização automática

🧑‍💻 Desenvolvido por
Luiz Isaias
GitHub
