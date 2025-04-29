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
exports.Produto = void 0;
const categoria_entity_1 = require("../../categoria/entities/categoria.entity");
const estoque_entity_1 = require("../../estoque/entities/estoque.entity");
const itemPedido_entity_1 = require("../../itemPedido/entities/itemPedido.entity");
const loja_entity_1 = require("../../loja/entities/loja.entity");
const typeorm_1 = require("typeorm");
let Produto = class Produto {
    id;
    nome;
    preco;
    categoria;
    loja;
    estoques;
    itensPedido;
};
exports.Produto = Produto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Produto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Produto.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Produto.prototype, "preco", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Categoria, categoria => categoria.produtos, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'categoriaId' }),
    __metadata("design:type", categoria_entity_1.Categoria)
], Produto.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => loja_entity_1.Loja, loja => loja.produtos, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'lojaId' }),
    __metadata("design:type", loja_entity_1.Loja)
], Produto.prototype, "loja", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => estoque_entity_1.Estoque, estoque => estoque.produto, { cascade: true }),
    __metadata("design:type", Array)
], Produto.prototype, "estoques", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => itemPedido_entity_1.ItemPedido, item => item.produto),
    __metadata("design:type", Array)
], Produto.prototype, "itensPedido", void 0);
exports.Produto = Produto = __decorate([
    (0, typeorm_1.Entity)()
], Produto);
//# sourceMappingURL=produto.entity.js.map