"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntregadorModule = void 0;
const common_1 = require("@nestjs/common");
const entregador_service_1 = require("./entregador.service");
const entregador_controller_1 = require("./entregador.controller");
const entregador_entity_1 = require("./entities/entregador.entity");
const typeorm_1 = require("@nestjs/typeorm");
let EntregadorModule = class EntregadorModule {
};
exports.EntregadorModule = EntregadorModule;
exports.EntregadorModule = EntregadorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entregador_entity_1.Entregador])],
        controllers: [entregador_controller_1.EntregadorController],
        providers: [entregador_service_1.EntregadorService],
    })
], EntregadorModule);
//# sourceMappingURL=entregador.module.js.map