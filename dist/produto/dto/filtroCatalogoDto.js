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
exports.FiltroCatalogoDto = exports.OrdenacaoCatalogo = void 0;
const class_validator_1 = require("class-validator");
var OrdenacaoCatalogo;
(function (OrdenacaoCatalogo) {
    OrdenacaoCatalogo["PRECO_ASC"] = "PRECO_ASC";
    OrdenacaoCatalogo["PRECO_DESC"] = "PRECO_DESC";
    OrdenacaoCatalogo["MAIS_VENDIDOS"] = "MAIS_VENDIDOS";
})(OrdenacaoCatalogo || (exports.OrdenacaoCatalogo = OrdenacaoCatalogo = {}));
class FiltroCatalogoDto {
    nome;
    categoriaId;
    minPreco;
    maxPreco;
    disponivel;
    ordenacao;
}
exports.FiltroCatalogoDto = FiltroCatalogoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FiltroCatalogoDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FiltroCatalogoDto.prototype, "categoriaId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FiltroCatalogoDto.prototype, "minPreco", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FiltroCatalogoDto.prototype, "maxPreco", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FiltroCatalogoDto.prototype, "disponivel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(OrdenacaoCatalogo),
    __metadata("design:type", String)
], FiltroCatalogoDto.prototype, "ordenacao", void 0);
//# sourceMappingURL=filtroCatalogoDto.js.map