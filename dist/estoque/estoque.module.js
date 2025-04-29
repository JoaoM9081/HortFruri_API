"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueModule = void 0;
const common_1 = require("@nestjs/common");
const estoque_service_1 = require("./estoque.service");
const estoque_controller_1 = require("./estoque.controller");
const estoque_entity_1 = require("./entities/estoque.entity");
const typeorm_1 = require("@nestjs/typeorm");
const produto_service_1 = require("../produto/produto.service");
const loja_service_1 = require("../loja/loja.service");
let EstoqueModule = class EstoqueModule {
};
exports.EstoqueModule = EstoqueModule;
exports.EstoqueModule = EstoqueModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([estoque_entity_1.Estoque])],
        controllers: [estoque_controller_1.EstoqueController],
        providers: [estoque_service_1.EstoqueService, produto_service_1.ProdutoService, loja_service_1.LojaService],
    })
], EstoqueModule);
//# sourceMappingURL=estoque.module.js.map