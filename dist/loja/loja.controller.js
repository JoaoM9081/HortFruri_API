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
exports.LojaController = void 0;
const common_1 = require("@nestjs/common");
const loja_service_1 = require("./loja.service");
const create_loja_dto_1 = require("./dto/create-loja.dto");
let LojaController = class LojaController {
    lojaService;
    constructor(lojaService) {
        this.lojaService = lojaService;
    }
    async create(usuarioId, enderecoId, createLojaDto) {
        const loja = await this.lojaService.create(usuarioId, enderecoId, createLojaDto);
        return {
            id: loja.id,
            nome: loja.nome,
            cnpj: loja.cnpj,
            telefone: loja.telefone,
        };
    }
    async findAll() {
        const lojas = await this.lojaService.findAll();
        return lojas.map((loja) => ({
            id: loja.id,
            nome: loja.nome,
            cnpj: loja.cnpj,
            telefone: loja.telefone,
        }));
    }
    async findOne(id) {
        const loja = await this.lojaService.findOne(id);
        return {
            id: loja.id,
            nome: loja.nome,
            cnpj: loja.cnpj,
            telefone: loja.telefone,
        };
    }
    async update(id, updateLojaDto) {
        const loja = await this.lojaService.update(id, updateLojaDto);
        return {
            id: loja.id,
            nome: loja.nome,
            cnpj: loja.cnpj,
            telefone: loja.telefone,
        };
    }
    async remove(id) {
        await this.lojaService.remove(id);
    }
    async findByName(nome) {
        const loja = await this.lojaService.findByName(nome);
        return {
            id: loja.id,
            nome: loja.nome,
            cnpj: loja.cnpj,
            telefone: loja.telefone,
        };
    }
};
exports.LojaController = LojaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('usuarioId')),
    __param(1, (0, common_1.Param)('enderecoId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_loja_dto_1.CreateLojaDto]),
    __metadata("design:returntype", Promise)
], LojaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LojaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LojaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LojaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LojaController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('nome/:nome'),
    __param(0, (0, common_1.Param)('nome')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LojaController.prototype, "findByName", null);
exports.LojaController = LojaController = __decorate([
    (0, common_1.Controller)('lojas'),
    __metadata("design:paramtypes", [loja_service_1.LojaService])
], LojaController);
//# sourceMappingURL=loja.controller.js.map