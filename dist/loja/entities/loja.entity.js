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
exports.Loja = void 0;
const endereco_entity_1 = require("../../endereco/entities/endereco.entity");
const estoque_entity_1 = require("../../estoque/entities/estoque.entity");
const pedido_entity_1 = require("../../pedido/entities/pedido.entity");
const produto_entity_1 = require("../../produto/entities/produto.entity");
const usuario_entity_1 = require("../../usuario/entities/usuario.entity");
const typeorm_1 = require("typeorm");
let Loja = class Loja {
    id;
    nome;
    cnpj;
    telefone;
    usuario;
    endereco;
    produtos;
    estoques;
    pedidos;
};
exports.Loja = Loja;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Loja.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Loja.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Loja.prototype, "cnpj", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Loja.prototype, "telefone", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'usuarioId' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Loja.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => endereco_entity_1.Endereco, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'enderecoId' }),
    __metadata("design:type", endereco_entity_1.Endereco)
], Loja.prototype, "endereco", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => produto_entity_1.Produto, produto => produto.loja, { cascade: true }),
    __metadata("design:type", Array)
], Loja.prototype, "produtos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => estoque_entity_1.Estoque, estoque => estoque.loja, { cascade: true }),
    __metadata("design:type", Array)
], Loja.prototype, "estoques", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pedido_entity_1.Pedido, pedido => pedido.loja, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Loja.prototype, "pedidos", void 0);
exports.Loja = Loja = __decorate([
    (0, typeorm_1.Entity)()
], Loja);
//# sourceMappingURL=loja.entity.js.map