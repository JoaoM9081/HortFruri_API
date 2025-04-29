"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEstoqueDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_estoque_dto_1 = require("./create-estoque.dto");
class UpdateEstoqueDto extends (0, swagger_1.PartialType)(create_estoque_dto_1.CreateEstoqueDto) {
}
exports.UpdateEstoqueDto = UpdateEstoqueDto;
//# sourceMappingURL=update-estoque.dto.js.map