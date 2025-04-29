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
exports.Pedido = void 0;
const consumidor_entity_1 = require("../../consumidor/entities/consumidor.entity");
const entregador_entity_1 = require("../../entregador/entities/entregador.entity");
const itemPedido_entity_1 = require("../../itemPedido/entities/itemPedido.entity");
const loja_entity_1 = require("../../loja/entities/loja.entity");
const pagamento_entity_1 = require("../../pagamento/entities/pagamento.entity");
const typeorm_1 = require("typeorm");
const StatusPedido_1 = require("../dto/StatusPedido");
let Pedido = class Pedido {
    id;
    status;
    consumidor;
    loja;
    entregador;
    itens;
    pagamentos;
    total;
    dataCriacao;
};
exports.Pedido = Pedido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pedido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: StatusPedido_1.StatusPedido, default: StatusPedido_1.StatusPedido.PENDENTE }),
    __metadata("design:type", String)
], Pedido.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => consumidor_entity_1.Consumidor, consumidor => consumidor.pedidos, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'consumidorId' }),
    __metadata("design:type", consumidor_entity_1.Consumidor)
], Pedido.prototype, "consumidor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => loja_entity_1.Loja, loja => loja.pedidos, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'lojaId' }),
    __metadata("design:type", loja_entity_1.Loja)
], Pedido.prototype, "loja", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entregador_entity_1.Entregador, entregador => entregador.pedidos, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'entregadorId' }),
    __metadata("design:type", entregador_entity_1.Entregador)
], Pedido.prototype, "entregador", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => itemPedido_entity_1.ItemPedido, item => item.pedido, { cascade: ['insert', 'update', 'remove'] }),
    __metadata("design:type", Array)
], Pedido.prototype, "itens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pagamento_entity_1.Pagamento, pagamento => pagamento.pedido, { cascade: ['insert', 'update', 'remove'] }),
    __metadata("design:type", Array)
], Pedido.prototype, "pagamentos", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pedido.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Pedido.prototype, "dataCriacao", void 0);
exports.Pedido = Pedido = __decorate([
    (0, typeorm_1.Entity)()
], Pedido);
//# sourceMappingURL=pedido.entity.js.map