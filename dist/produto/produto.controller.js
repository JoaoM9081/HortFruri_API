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
exports.ProdutoController = void 0;
const common_1 = require("@nestjs/common");
const produto_service_1 = require("./produto.service");
const create_produto_dto_1 = require("./dto/create-produto.dto");
const filtroCatalogoDto_1 = require("./dto/filtroCatalogoDto");
let ProdutoController = class ProdutoController {
    produtoService;
    constructor(produtoService) {
        this.produtoService = produtoService;
    }
    async create(lojaId, categoriaId, createProdutoDto) {
        const produto = await this.produtoService.create(lojaId, categoriaId, createProdutoDto);
        return {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            categoria: produto.categoria.nome,
            quantidadeDisponivel: produto.estoques.reduce((total, estoque) => total + estoque.quantidadeDisponivel, 0),
        };
    }
    async findAll() {
        const produtos = await this.produtoService.findAll();
        return produtos.map(produto => ({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            categoria: produto.categoria.nome,
            quantidadeDisponivel: produto.estoques.reduce((total, estoque) => total + estoque.quantidadeDisponivel, 0),
        }));
    }
    async findOne(id) {
        const produto = await this.produtoService.findOne(id);
        return {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            categoria: produto.categoria.nome,
            quantidadeDisponivel: produto.estoques.reduce((total, estoque) => total + estoque.quantidadeDisponivel, 0),
        };
    }
    async update(id, updateProdutoDto) {
        const produto = await this.produtoService.update(id, updateProdutoDto);
        return {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            categoria: produto.categoria.nome,
            quantidadeDisponivel: produto.estoques.reduce((total, estoque) => total + estoque.quantidadeDisponivel, 0),
        };
    }
    async remove(id) {
        await this.produtoService.remove(id);
    }
    async buscar(filtro) {
        const produtos = await this.produtoService.buscar(filtro);
        return produtos;
    }
};
exports.ProdutoController = ProdutoController;
__decorate([
    (0, common_1.Post)(':lojaId/:categoriaId'),
    __param(0, (0, common_1.Param)('lojaId')),
    __param(1, (0, common_1.Param)('categoriaId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_produto_dto_1.CreateProdutoDto]),
    __metadata("design:returntype", Promise)
], ProdutoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProdutoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProdutoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProdutoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProdutoController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/buscar'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtroCatalogoDto_1.FiltroCatalogoDto]),
    __metadata("design:returntype", Promise)
], ProdutoController.prototype, "buscar", null);
exports.ProdutoController = ProdutoController = __decorate([
    (0, common_1.Controller)('produtos'),
    __metadata("design:paramtypes", [produto_service_1.ProdutoService])
], ProdutoController);
//# sourceMappingURL=produto.controller.js.map