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
exports.Usuario = void 0;
const consumidor_entity_1 = require("../../consumidor/entities/consumidor.entity");
const entregador_entity_1 = require("../../entregador/entities/entregador.entity");
const loja_entity_1 = require("../../loja/entities/loja.entity");
const typeorm_1 = require("typeorm");
let Usuario = class Usuario {
    id;
    email;
    senha;
    papel;
    criadoEm;
    atualizadoEm;
    consumidor;
    entregador;
    loja;
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['CONSUMIDOR', 'ENTREGADOR', 'LOJA'] }),
    __metadata("design:type", String)
], Usuario.prototype, "papel", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Usuario.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Usuario.prototype, "atualizadoEm", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => consumidor_entity_1.Consumidor, consumidor => consumidor.usuario),
    __metadata("design:type", consumidor_entity_1.Consumidor)
], Usuario.prototype, "consumidor", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entregador_entity_1.Entregador, entregador => entregador.usuario),
    __metadata("design:type", entregador_entity_1.Entregador)
], Usuario.prototype, "entregador", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => loja_entity_1.Loja, loja => loja.usuario),
    __metadata("design:type", loja_entity_1.Loja)
], Usuario.prototype, "loja", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)()
], Usuario);
//# sourceMappingURL=usuario.entity.js.map