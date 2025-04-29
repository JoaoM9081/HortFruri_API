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
exports.ItemPedidoController = void 0;
const common_1 = require("@nestjs/common");
const itemPedido_service_1 = require("./itemPedido.service");
const create_itemPedido_dto_1 = require("./dto/create-itemPedido.dto");
const produto_service_1 = require("../produto/produto.service");
let ItemPedidoController = class ItemPedidoController {
    itemPedidoService;
    produtoService;
    constructor(itemPedidoService, produtoService) {
        this.itemPedidoService = itemPedidoService;
        this.produtoService = produtoService;
    }
    async create(pedidoId, produtoId, createItemPedidoDto) {
        const itemPedido = await this.itemPedidoService.create(pedidoId, produtoId, createItemPedidoDto);
        const produto = await this.produtoService.findOne(produtoId);
        return {
            id: itemPedido.id,
            nomeProduto: produto.nome,
            quantidade: itemPedido.quantidade,
            precoUnitario: produto.preco,
        };
    }
    async findAll() {
        const itensPedido = await this.itemPedidoService.findAll();
        const itensResponse = await Promise.all(itensPedido.map(async (item) => {
            const produto = await this.produtoService.findOne(item.produto.id);
            return {
                id: item.id,
                nomeProduto: produto.nome,
                quantidade: item.quantidade,
                precoUnitario: produto.preco,
            };
        }));
        return itensResponse;
    }
    async findOne(id) {
        const itemPedido = await this.itemPedidoService.findOne(id);
        const produto = await this.produtoService.findOne(itemPedido.produto.id);
        return {
            id: itemPedido.id,
            nomeProduto: produto.nome,
            quantidade: itemPedido.quantidade,
            precoUnitario: produto.preco,
        };
    }
    async update(id, updateItemPedidoDto) {
        const itemPedido = await this.itemPedidoService.update(id, updateItemPedidoDto);
        const produto = await this.produtoService.findOne(itemPedido.produto.id);
        return {
            id: itemPedido.id,
            nomeProduto: produto.nome,
            quantidade: itemPedido.quantidade,
            precoUnitario: produto.preco,
        };
    }
    async remove(id) {
        await this.itemPedidoService.remove(id);
    }
};
exports.ItemPedidoController = ItemPedidoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('pedidoId')),
    __param(1, (0, common_1.Param)('produtoId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_itemPedido_dto_1.CreateItemPedidoDto]),
    __metadata("design:returntype", Promise)
], ItemPedidoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemPedidoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ItemPedidoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_itemPedido_dto_1.CreateItemPedidoDto]),
    __metadata("design:returntype", Promise)
], ItemPedidoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ItemPedidoController.prototype, "remove", null);
exports.ItemPedidoController = ItemPedidoController = __decorate([
    (0, common_1.Controller)('itens-pedido'),
    __metadata("design:paramtypes", [itemPedido_service_1.ItemPedidoService,
        produto_service_1.ProdutoService])
], ItemPedidoController);
//# sourceMappingURL=itemPedido.controller.js.map