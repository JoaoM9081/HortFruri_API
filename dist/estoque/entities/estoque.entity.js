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
exports.Estoque = void 0;
const loja_entity_1 = require("../../loja/entities/loja.entity");
const produto_entity_1 = require("../../produto/entities/produto.entity");
const typeorm_1 = require("typeorm");
let Estoque = class Estoque {
    id;
    produto;
    loja;
    quantidadeDisponivel;
    dataAtualizacao;
};
exports.Estoque = Estoque;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Estoque.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => produto_entity_1.Produto, produto => produto.estoques, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'produtoId' }),
    __metadata("design:type", produto_entity_1.Produto)
], Estoque.prototype, "produto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => loja_entity_1.Loja, loja => loja.estoques, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'lojaId' }),
    __metadata("design:type", loja_entity_1.Loja)
], Estoque.prototype, "loja", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Estoque.prototype, "quantidadeDisponivel", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Estoque.prototype, "dataAtualizacao", void 0);
exports.Estoque = Estoque = __decorate([
    (0, typeorm_1.Entity)()
], Estoque);
//# sourceMappingURL=estoque.entity.js.map