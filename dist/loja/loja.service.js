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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LojaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const loja_entity_1 = require("./entities/loja.entity");
let LojaService = class LojaService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(usuarioId, enderecoId, dto) {
        const loja = this.repo.create({
            ...dto,
            usuario: { id: usuarioId },
            endereco: { id: enderecoId },
        });
        return this.repo.save(loja);
    }
    findAll() {
        return this.repo.find({ relations: ['usuario', 'endereco', 'produtos'] });
    }
    async findOne(id) {
        const loja = await this.repo.findOne({
            where: { id },
            relations: ['usuario', 'endereco', 'produtos'],
        });
        if (!loja)
            throw new common_1.NotFoundException(`Loja ${id} não encontrada`);
        return loja;
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
    async findByName(nome) {
        const loja = await this.repo.findOne({ where: { nome } });
        if (!loja)
            throw new common_1.NotFoundException(`Loja com nome ${nome} não encontrada`);
        return loja;
    }
};
exports.LojaService = LojaService;
exports.LojaService = LojaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(loja_entity_1.Loja)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LojaService);
//# sourceMappingURL=loja.service.js.map