"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumidorModule = void 0;
const common_1 = require("@nestjs/common");
const consumidor_service_1 = require("./consumidor.service");
const consumidor_controller_1 = require("./consumidor.controller");
const consumidor_entity_1 = require("./entities/consumidor.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ConsumidorModule = class ConsumidorModule {
};
exports.ConsumidorModule = ConsumidorModule;
exports.ConsumidorModule = ConsumidorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([consumidor_entity_1.Consumidor])],
        controllers: [consumidor_controller_1.ConsumidorController],
        providers: [consumidor_service_1.ConsumidorService],
    })
], ConsumidorModule);
//# sourceMappingURL=consumidor.module.js.map