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
exports.Pagamento = void 0;
const pedido_entity_1 = require("../../pedido/entities/pedido.entity");
const typeorm_1 = require("typeorm");
let Pagamento = class Pagamento {
    id;
    pedido;
    formaPagamento;
    status;
    valorPago;
    dataPagamento;
};
exports.Pagamento = Pagamento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pagamento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pedido_entity_1.Pedido, pedido => pedido.pagamentos, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'pedidoId' }),
    __metadata("design:type", pedido_entity_1.Pedido)
], Pagamento.prototype, "pedido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['PIX', 'CARTAO', 'DINHEIRO'] }),
    __metadata("design:type", String)
], Pagamento.prototype, "formaPagamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['PENDENTE', 'CONCLUIDO', 'FALHOU'] }),
    __metadata("design:type", String)
], Pagamento.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pagamento.prototype, "valorPago", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Pagamento.prototype, "dataPagamento", void 0);
exports.Pagamento = Pagamento = __decorate([
    (0, typeorm_1.Entity)()
], Pagamento);
//# sourceMappingURL=pagamento.entity.js.map