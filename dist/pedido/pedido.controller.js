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
exports.PedidoController = void 0;
const common_1 = require("@nestjs/common");
const pedido_service_1 = require("./pedido.service");
const create_pedido_dto_1 = require("./dto/create-pedido.dto");
const create_pagamento_dto_1 = require("../pagamento/dto/create-pagamento.dto");
let PedidoController = class PedidoController {
    pedidoService;
    constructor(pedidoService) {
        this.pedidoService = pedidoService;
    }
    async create(consumidorId, lojaId, createPedidoDto) {
        const pedido = await this.pedidoService.create(consumidorId, lojaId, createPedidoDto);
        return {
            id: pedido.id,
            status: pedido.status,
            total: pedido.total,
            dataCriacao: pedido.dataCriacao,
            itens: pedido.itens.map(item => ({
                id: item.id,
                nomeProduto: item.produto.nome,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
            })),
        };
    }
    async findAll() {
        const pedidos = await this.pedidoService.findAll();
        return pedidos.map(pedido => ({
            id: pedido.id,
            status: pedido.status,
            total: pedido.total,
            dataCriacao: pedido.dataCriacao,
            itens: pedido.itens.map(item => ({
                id: item.id,
                nomeProduto: item.produto.nome,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
            })),
        }));
    }
    async findOne(id) {
        const pedido = await this.pedidoService.findOne(id);
        return {
            id: pedido.id,
            status: pedido.status,
            total: pedido.total,
            dataCriacao: pedido.dataCriacao,
            itens: pedido.itens.map(item => ({
                id: item.id,
                nomeProduto: item.produto.nome,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
            })),
        };
    }
    async update(id, updatePedidoDto) {
        const pedido = await this.pedidoService.update(id, updatePedidoDto);
        return {
            id: pedido.id,
            status: pedido.status,
            total: pedido.total,
            dataCriacao: pedido.dataCriacao,
            itens: pedido.itens.map(item => ({
                id: item.id,
                nomeProduto: item.produto.nome,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
            })),
        };
    }
    async remove(id) {
        await this.pedidoService.remove(id);
    }
    async iniciarCheckout(pedidoId, forma) {
        const pagamento = await this.pedidoService.iniciarCheckout(pedidoId, forma);
        return pagamento;
    }
    async confirmarPagamento(pedidoId, pagamentoId) {
        const pagamentoConfirmado = await this.pedidoService.confirmarPagamento(pagamentoId);
        return pagamentoConfirmado;
    }
};
exports.PedidoController = PedidoController;
__decorate([
    (0, common_1.Post)(':consumidorId/:lojaId'),
    __param(0, (0, common_1.Param)('consumidorId')),
    __param(1, (0, common_1.Param)('lojaId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_pedido_dto_1.CreatePedidoDto]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':pedidoId/checkout/:forma'),
    __param(0, (0, common_1.Param)('pedidoId')),
    __param(1, (0, common_1.Param)('forma')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "iniciarCheckout", null);
__decorate([
    (0, common_1.Post)(':pedidoId/confirmar-pagamento/:pagamentoId'),
    __param(0, (0, common_1.Param)('pedidoId')),
    __param(1, (0, common_1.Param)('pagamentoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "confirmarPagamento", null);
exports.PedidoController = PedidoController = __decorate([
    (0, common_1.Controller)('pedidos'),
    __metadata("design:paramtypes", [pedido_service_1.PedidoService])
], PedidoController);
//# sourceMappingURL=pedido.controller.js.map