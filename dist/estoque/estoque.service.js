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
exports.EstoqueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const estoque_entity_1 = require("./entities/estoque.entity");
const produto_service_1 = require("../produto/produto.service");
const loja_service_1 = require("../loja/loja.service");
let EstoqueService = class EstoqueService {
    repo;
    produtoService;
    lojaService;
    constructor(repo, produtoService, lojaService) {
        this.repo = repo;
        this.produtoService = produtoService;
        this.lojaService = lojaService;
    }
    async create(produtoId, lojaId, dto) {
        await this.produtoService.findOne(produtoId);
        await this.lojaService.findOne(lojaId);
        const estoque = this.repo.create({
            ...dto,
            produto: { id: produtoId },
            loja: { id: lojaId },
        });
        return this.repo.save(estoque);
    }
    findAll() {
        return this.repo.find({ relations: ['produto', 'loja'] });
    }
    async findOne(id) {
        const e = await this.repo.findOne({ where: { id }, relations: ['produto', 'loja'] });
        if (!e)
            throw new common_1.NotFoundException(`Estoque ${id} não encontrado`);
        return e;
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
    async decrementStock(lojaId, produtoId, quantidade) {
        const estoque = await this.repo.findOne({
            where: { loja: { id: lojaId }, produto: { id: produtoId } },
        });
        if (!estoque)
            throw new common_1.NotFoundException('Estoque não encontrado');
        if (estoque.quantidadeDisponivel < quantidade) {
            throw new common_1.BadRequestException('Estoque insuficiente');
        }
        estoque.quantidadeDisponivel -= quantidade;
        await this.repo.save(estoque);
    }
};
exports.EstoqueService = EstoqueService;
exports.EstoqueService = EstoqueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estoque_entity_1.Estoque)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        produto_service_1.ProdutoService,
        loja_service_1.LojaService])
], EstoqueService);
//# sourceMappingURL=estoque.service.js.map