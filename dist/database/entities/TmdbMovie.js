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
exports.TmdbMovie = void 0;
const typeorm_1 = require("typeorm");
const VodItem_1 = require("./VodItem");
let TmdbMovie = class TmdbMovie {
};
exports.TmdbMovie = TmdbMovie;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TmdbMovie.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TmdbMovie.prototype, "tmdbId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => VodItem_1.VodItem, (vodItem) => vodItem.tmdbMovie),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", VodItem_1.VodItem)
], TmdbMovie.prototype, "vodItem", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TmdbMovie.prototype, "overview", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TmdbMovie.prototype, "posterPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TmdbMovie.prototype, "backdropPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TmdbMovie.prototype, "releaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TmdbMovie.prototype, "runtime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TmdbMovie.prototype, "voteAverage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Array)
], TmdbMovie.prototype, "genres", void 0);
exports.TmdbMovie = TmdbMovie = __decorate([
    (0, typeorm_1.Entity)()
], TmdbMovie);
