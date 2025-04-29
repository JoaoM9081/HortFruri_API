"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConsumidorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_consumidor_dto_1 = require("./create-consumidor.dto");
class UpdateConsumidorDto extends (0, swagger_1.PartialType)(create_consumidor_dto_1.CreateConsumidorDto) {
}
exports.UpdateConsumidorDto = UpdateConsumidorDto;
//# sourceMappingURL=update-consumidor.dto.js.map