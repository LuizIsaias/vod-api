"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VodItem = void 0;
const typeorm_1 = require("typeorm");
const VodCategory_1 = require("./VodCategory");
const TmdbMovie_1 = require("./TmdbMovie");
let VodItem = class VodItem {
};
exports.VodItem = VodItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VodItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], VodItem.prototype, "xtreamVodId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VodItem.prototype, "titleOriginal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VodItem.prototype, "titleNormalized", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => VodCategory_1.VodCategory, (category) => category.items, {
        nullable: true,
        onDelete: "SET NULL",
    }),
    __metadata("design:type", VodCategory_1.VodCategory)
], VodItem.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VodItem.prototype, "streamIcon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime" }),
    __metadata("design:type", Date)
], VodItem.prototype, "addedAtXtream", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VodItem.prototype, "containerExtension", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => TmdbMovie_1.TmdbMovie, (tmdb) => tmdb.vodItem),
    __metadata("design:type", TmdbMovie_1.TmdbMovie)
], VodItem.prototype, "tmdbMovie", void 0);
exports.VodItem = VodItem = __decorate([
    (0, typeorm_1.Entity)()
], VodItem);
