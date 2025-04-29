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
exports.EnderecoController = void 0;
const common_1 = require("@nestjs/common");
const endereco_service_1 = require("./endereco.service");
const create_endereco_dto_1 = require("./dto/create-endereco.dto");
const update_endereco_dto_1 = require("./dto/update-endereco.dto");
let EnderecoController = class EnderecoController {
    enderecoService;
    constructor(enderecoService) {
        this.enderecoService = enderecoService;
    }
    async create(createEnderecoDto) {
        const endereco = await this.enderecoService.create(createEnderecoDto);
        return {
            id: endereco.id,
            rua: endereco.rua,
            numero: endereco.numero,
            cidade: endereco.cidade,
            cep: endereco.cep,
        };
    }
    async findAll() {
        const enderecos = await this.enderecoService.findAll();
        return enderecos.map((endereco) => ({
            id: endereco.id,
            rua: endereco.rua,
            numero: endereco.numero,
            cidade: endereco.cidade,
            cep: endereco.cep,
        }));
    }
    async findOne(id) {
        const endereco = await this.enderecoService.findOne(id);
        return {
            id: endereco.id,
            rua: endereco.rua,
            numero: endereco.numero,
            cidade: endereco.cidade,
            cep: endereco.cep,
        };
    }
    async update(id, updateEnderecoDto) {
        const endereco = await this.enderecoService.update(id, updateEnderecoDto);
        return {
            id: endereco.id,
            rua: endereco.rua,
            numero: endereco.numero,
            cidade: endereco.cidade,
            cep: endereco.cep,
        };
    }
    async remove(id) {
        await this.enderecoService.remove(id);
    }
};
exports.EnderecoController = EnderecoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_endereco_dto_1.CreateEnderecoDto]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_endereco_dto_1.UpdateEnderecoDto]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "remove", null);
exports.EnderecoController = EnderecoController = __decorate([
    (0, common_1.Controller)('enderecos'),
    __metadata("design:paramtypes", [endereco_service_1.EnderecoService])
], EnderecoController);
//# sourceMappingURL=endereco.controller.js.map