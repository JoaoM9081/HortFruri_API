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
exports.PagamentoController = void 0;
const common_1 = require("@nestjs/common");
const pagamento_service_1 = require("./pagamento.service");
const create_pagamento_dto_1 = require("./dto/create-pagamento.dto");
let PagamentoController = class PagamentoController {
    pagamentoService;
    constructor(pagamentoService) {
        this.pagamentoService = pagamentoService;
    }
    async create(pedidoId, createPagamentoDto) {
        const pagamento = await this.pagamentoService.create(pedidoId, createPagamentoDto);
        return {
            id: pagamento.id,
            formaPagamento: pagamento.formaPagamento,
            status: pagamento.status,
            valorPago: pagamento.valorPago,
        };
    }
    async findAll() {
        const pagamentos = await this.pagamentoService.findAll();
        return pagamentos.map((pagamento) => ({
            id: pagamento.id,
            formaPagamento: pagamento.formaPagamento,
            status: pagamento.status,
            valorPago: pagamento.valorPago,
        }));
    }
    async findOne(id) {
        const pagamento = await this.pagamentoService.findOne(id);
        return {
            id: pagamento.id,
            formaPagamento: pagamento.formaPagamento,
            status: pagamento.status,
            valorPago: pagamento.valorPago,
        };
    }
    async update(id, updatePagamentoDto) {
        const pagamento = await this.pagamentoService.update(id, updatePagamentoDto);
        return {
            id: pagamento.id,
            formaPagamento: pagamento.formaPagamento,
            status: pagamento.status,
            valorPago: pagamento.valorPago,
        };
    }
    async remove(id) {
        await this.pagamentoService.remove(id);
    }
};
exports.PagamentoController = PagamentoController;
__decorate([
    (0, common_1.Post)(':pedidoId'),
    __param(0, (0, common_1.Param)('pedidoId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_pagamento_dto_1.CreatePagamentoDto]),
    __metadata("design:returntype", Promise)
], PagamentoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagamentoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PagamentoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PagamentoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PagamentoController.prototype, "remove", null);
exports.PagamentoController = PagamentoController = __decorate([
    (0, common_1.Controller)('pagamentos'),
    __metadata("design:paramtypes", [pagamento_service_1.PagamentoService])
], PagamentoController);
//# sourceMappingURL=pagamento.controller.js.map