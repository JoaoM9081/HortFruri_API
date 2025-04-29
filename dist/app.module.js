"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const usuario_module_1 = require("./usuario/usuario.module");
const consumidor_module_1 = require("./consumidor/consumidor.module");
const entregador_module_1 = require("./entregador/entregador.module");
const loja_module_1 = require("./loja/loja.module");
const categoria_module_1 = require("./categoria/categoria.module");
const produto_module_1 = require("./produto/produto.module");
const endereco_module_1 = require("./endereco/endereco.module");
const estoque_module_1 = require("./estoque/estoque.module");
const pedido_module_1 = require("./pedido/pedido.module");
const itemPedido_module_1 = require("./itemPedido/itemPedido.module");
const pagamento_module_1 = require("./pagamento/pagamento.module");
const typeorm_1 = require("@nestjs/typeorm");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            usuario_module_1.UsuarioModule, consumidor_module_1.ConsumidorModule, entregador_module_1.EntregadorModule, loja_module_1.LojaModule, categoria_module_1.CategoriaModule, produto_module_1.ProdutoModule, endereco_module_1.EnderecoModule, estoque_module_1.EstoqueModule, pedido_module_1.PedidoModule, itemPedido_module_1.ItemPedidoModule, pagamento_module_1.PagamentoModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map