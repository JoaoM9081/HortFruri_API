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
exports.ConsumidorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const consumidor_entity_1 = require("./entities/consumidor.entity");
let ConsumidorService = class ConsumidorService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(usuarioId, dto) {
        const entity = this.repo.create({
            ...dto,
            usuario: { id: usuarioId },
        });
        return this.repo.save(entity);
    }
    findAll() {
        return this.repo.find({ relations: ['usuario', 'pedidos'] });
    }
    async findOne(id) {
        const c = await this.repo.findOne({
            where: { id },
            relations: ['usuario', 'pedidos'],
        });
        if (!c)
            throw new common_1.NotFoundException(`Consumidor ${id} não encontrado`);
        return c;
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.ConsumidorService = ConsumidorService;
exports.ConsumidorService = ConsumidorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(consumidor_entity_1.Consumidor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConsumidorService);
//# sourceMappingURL=consumidor.service.js.map