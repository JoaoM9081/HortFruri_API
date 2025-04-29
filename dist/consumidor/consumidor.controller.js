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
exports.ConsumidorController = void 0;
const common_1 = require("@nestjs/common");
const consumidor_service_1 = require("./consumidor.service");
const create_consumidor_dto_1 = require("./dto/create-consumidor.dto");
let ConsumidorController = class ConsumidorController {
    consumidorService;
    constructor(consumidorService) {
        this.consumidorService = consumidorService;
    }
    async create(usuarioId, dto) {
        const consumidor = await this.consumidorService.create(usuarioId, dto);
        return {
            id: consumidor.id,
            nome: consumidor.nome,
            telefone: consumidor.telefone,
        };
    }
    async findAll() {
        const consumidores = await this.consumidorService.findAll();
        return consumidores.map((consumidor) => ({
            id: consumidor.id,
            nome: consumidor.nome,
            telefone: consumidor.telefone,
        }));
    }
    async findOne(id) {
        const consumidor = await this.consumidorService.findOne(id);
        return {
            id: consumidor.id,
            nome: consumidor.nome,
            telefone: consumidor.telefone,
        };
    }
    async update(id, dto) {
        const consumidor = await this.consumidorService.update(id, dto);
        return {
            id: consumidor.id,
            nome: consumidor.nome,
            telefone: consumidor.telefone,
        };
    }
    async remove(id) {
        await this.consumidorService.remove(id);
    }
};
exports.ConsumidorController = ConsumidorController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('usuarioId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_consumidor_dto_1.CreateConsumidorDto]),
    __metadata("design:returntype", Promise)
], ConsumidorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConsumidorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConsumidorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ConsumidorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConsumidorController.prototype, "remove", null);
exports.ConsumidorController = ConsumidorController = __decorate([
    (0, common_1.Controller)('consumidores'),
    __metadata("design:paramtypes", [consumidor_service_1.ConsumidorService])
], ConsumidorController);
//# sourceMappingURL=consumidor.controller.js.map