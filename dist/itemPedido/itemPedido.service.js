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
exports.ItemPedidoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const itemPedido_entity_1 = require("./entities/itemPedido.entity");
let ItemPedidoService = class ItemPedidoService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(pedidoId, produtoId, dto) {
        const item = this.repo.create({
            ...dto,
            pedido: { id: pedidoId },
            produto: { id: produtoId },
        });
        return this.repo.save(item);
    }
    findAll() {
        return this.repo.find({ relations: ['pedido', 'produto'] });
    }
    async findOne(id) {
        const ip = await this.repo.findOne({ where: { id }, relations: ['pedido', 'produto'] });
        if (!ip)
            throw new common_1.NotFoundException(`ItemPedido ${id} não encontrado`);
        return ip;
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
};
exports.ItemPedidoService = ItemPedidoService;
exports.ItemPedidoService = ItemPedidoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(itemPedido_entity_1.ItemPedido)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ItemPedidoService);
//# sourceMappingURL=itemPedido.service.js.map