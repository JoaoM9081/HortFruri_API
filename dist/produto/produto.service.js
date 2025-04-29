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
exports.ProdutoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const produto_entity_1 = require("./entities/produto.entity");
const filtroCatalogoDto_1 = require("./dto/filtroCatalogoDto");
let ProdutoService = class ProdutoService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(lojaId, categoriaId, dto) {
        const produto = this.repo.create({
            ...dto,
            loja: { id: lojaId },
            categoria: { id: categoriaId },
        });
        return this.repo.save(produto);
    }
    findAll() {
        return this.repo.find({ relations: ['loja', 'categoria', 'estoques'] });
    }
    async findOne(id) {
        const produto = await this.repo.findOne({
            where: { id },
            relations: ['loja', 'categoria', 'estoques'],
        });
        if (!produto)
            throw new common_1.NotFoundException(`Produto ${id} não encontrado`);
        return produto;
    }
    async update(id, dto) {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
    async buscar(filtro) {
        const qb = this.repo.createQueryBuilder('produto')
            .innerJoin('produto.categoria', 'categoria')
            .leftJoin('produto.estoques', 'estoque')
            .select([
            'produto.id',
            'produto.nome',
            'produto.preco',
            'categoria.nome',
        ])
            .addSelect('COALESCE(SUM(estoque.quantidadeDisponivel), 0)', 'quantidadeDisponivel');
        if (filtro.nome) {
            qb.andWhere('LOWER(produto.nome) LIKE LOWER(:nome)', { nome: `%${filtro.nome}%` });
        }
        if (filtro.categoriaId) {
            qb.andWhere('categoria.id = :catId', { catId: filtro.categoriaId });
        }
        if (filtro.minPreco !== undefined) {
            qb.andWhere('produto.preco >= :min', { min: filtro.minPreco });
        }
        if (filtro.maxPreco !== undefined) {
            qb.andWhere('produto.preco <= :max', { max: filtro.maxPreco });
        }
        if (filtro.disponivel !== undefined) {
            qb.andWhere('COALESCE(SUM(estoque.quantidadeDisponivel), 0) > 0');
        }
        qb.groupBy('produto.id').addGroupBy('categoria.nome');
        switch (filtro.ordenacao) {
            case filtroCatalogoDto_1.OrdenacaoCatalogo.PRECO_ASC:
                qb.orderBy('produto.preco', 'ASC');
                break;
            case filtroCatalogoDto_1.OrdenacaoCatalogo.PRECO_DESC:
                qb.orderBy('produto.preco', 'DESC');
                break;
            case filtroCatalogoDto_1.OrdenacaoCatalogo.MAIS_VENDIDOS:
                qb.leftJoin('produto.itensPedido', 'ip')
                    .addSelect('COUNT(ip.id)', 'totalVendido')
                    .orderBy('COUNT(ip.id)', 'DESC');
                break;
            default:
                qb.orderBy('produto.nome', 'ASC');
        }
        const resultados = await qb.getRawAndEntities();
        return resultados.entities.map((produto, idx) => {
            const raw = resultados.raw[idx];
            return {
                id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                categoria: raw['categoria_nome'],
                quantidadeDisponivel: +raw['quantidadeDisponivel'],
                totalVendido: raw['totalVendido'] ? +raw['totalVendido'] : undefined,
            };
        });
    }
    async findByName(nome) {
        const produto = await this.repo.findOne({ where: { nome } });
        if (!produto)
            throw new common_1.NotFoundException(`Produto com nome ${nome} não encontrado`);
        return produto;
    }
};
exports.ProdutoService = ProdutoService;
exports.ProdutoService = ProdutoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(produto_entity_1.Produto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProdutoService);
//# sourceMappingURL=produto.service.js.map