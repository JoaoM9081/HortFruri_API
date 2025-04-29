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
exports.PedidoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pedido_entity_1 = require("./entities/pedido.entity");
const itemPedido_entity_1 = require("../itemPedido/entities/itemPedido.entity");
const produto_service_1 = require("../produto/produto.service");
const estoque_service_1 = require("../estoque/estoque.service");
const pagamento_service_1 = require("../pagamento/pagamento.service");
const create_pagamento_dto_1 = require("../pagamento/dto/create-pagamento.dto");
const StatusPedido_1 = require("./dto/StatusPedido");
let PedidoService = class PedidoService {
    pedidoRepo;
    itemRepo;
    produtoService;
    estoqueService;
    pagamentoService;
    constructor(pedidoRepo, itemRepo, produtoService, estoqueService, pagamentoService) {
        this.pedidoRepo = pedidoRepo;
        this.itemRepo = itemRepo;
        this.produtoService = produtoService;
        this.estoqueService = estoqueService;
        this.pagamentoService = pagamentoService;
    }
    async create(consumidorId, lojaId, dto) {
        const pedido = this.pedidoRepo.create({
            ...dto,
            consumidor: { id: consumidorId },
            loja: { id: lojaId },
            status: StatusPedido_1.StatusPedido.PENDENTE,
        });
        return this.pedidoRepo.save(pedido);
    }
    findAll() {
        return this.pedidoRepo.find({ relations: ['consumidor', 'loja', 'entregador', 'itens', 'pagamentos'] });
    }
    async findOne(id) {
        const pd = await this.pedidoRepo.findOne({
            where: { id },
            relations: ['consumidor', 'loja', 'entregador', 'itens', 'pagamentos'],
        });
        if (!pd)
            throw new common_1.NotFoundException(`Pedido ${id} não encontrado`);
        return pd;
    }
    async update(id, dto) {
        await this.pedidoRepo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.pedidoRepo.delete(id);
    }
    async pegarOuCriarCarrinho(consumidorId, lojaId) {
        let carrinho = await this.pedidoRepo.findOne({
            where: {
                consumidor: { id: consumidorId },
                loja: { id: lojaId },
                status: StatusPedido_1.StatusPedido.PENDENTE
            },
            relations: ['itens', 'itens.produto']
        });
        if (!carrinho) {
            carrinho = this.pedidoRepo.create({
                consumidor: { id: consumidorId },
                loja: { id: lojaId },
                status: StatusPedido_1.StatusPedido.PENDENTE,
                total: 0,
            });
            carrinho = await this.pedidoRepo.save(carrinho);
        }
        return carrinho;
    }
    async adicionarItemCarrinho(consumidorId, lojaId, produtoId, dto) {
        const carrinho = await this.pegarOuCriarCarrinho(consumidorId, lojaId);
        const produto = await this.produtoService.findOne(produtoId);
        const estoqueLoja = produto.estoques.find(e => e.loja.id === lojaId);
        if (!estoqueLoja || dto.quantidade > estoqueLoja.quantidadeDisponivel) {
            throw new common_1.BadRequestException('Quantidade solicitada excede o estoque disponível');
        }
        let item = await this.itemRepo.findOne({
            where: { pedido: { id: carrinho.id }, produto: { id: produtoId } }
        });
        if (item) {
            item.quantidade += dto.quantidade;
        }
        else {
            item = this.itemRepo.create({
                pedido: { id: carrinho.id },
                produto: { id: produtoId },
                quantidade: dto.quantidade,
                precoUnitario: produto.preco
            });
        }
        await this.itemRepo.save(item);
        return this.recalcularTotal(carrinho.id);
    }
    async removerItemCarrinho(pedidoId, itemId) {
        const item = await this.itemRepo.findOne({
            where: { id: itemId, pedido: { id: pedidoId } }
        });
        if (!item)
            throw new common_1.NotFoundException(`Item ${itemId} não encontrado no carrinho ${pedidoId}`);
        await this.itemRepo.delete(itemId);
        return this.recalcularTotal(pedidoId);
    }
    async recalcularTotal(pedidoId) {
        const pedido = await this.pedidoRepo.findOne({
            where: { id: pedidoId },
            relations: ['itens']
        });
        if (!pedido) {
            throw new common_1.NotFoundException(`Pedido ${pedidoId} não encontrado`);
        }
        pedido.total = pedido.itens.reduce((soma, i) => soma + i.precoUnitario * i.quantidade, 0);
        return this.pedidoRepo.save(pedido);
    }
    async iniciarCheckout(pedidoId, forma) {
        const pedido = await this.recalcularTotal(pedidoId);
        if (pedido.itens.length === 0)
            throw new common_1.BadRequestException('Carrinho vazio');
        const pagamento = await this.pagamentoService.create(pedidoId, {
            formaPagamento: forma,
        });
        pedido.status = StatusPedido_1.StatusPedido.ABERTO_PARA_PAGAMENTO;
        await this.pedidoRepo.save(pedido);
        return pagamento;
    }
    async confirmarPagamento(pagamentoId) {
        const pagamento = await this.pagamentoService.findOne(pagamentoId);
        if (pagamento.status !== create_pagamento_dto_1.StatusPagamento.CONCLUIDO) {
            throw new common_1.BadRequestException('Pagamento ainda não concluído');
        }
        const pedido = await this.pedidoRepo.findOne({
            where: { id: pagamento.pedido.id },
            relations: ['itens', 'itens.produto', 'loja']
        });
        if (!pedido) {
            throw new common_1.NotFoundException(`Pedido com ID ${pagamento.pedido.id} não encontrado`);
        }
        for (const item of pedido.itens) {
            await this.estoqueService.decrementStock(pedido.loja.id, item.produto.id, item.quantidade);
        }
        pedido.status = StatusPedido_1.StatusPedido.FINALIZADO;
        return this.pedidoRepo.save(pedido);
    }
};
exports.PedidoService = PedidoService;
exports.PedidoService = PedidoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pedido_entity_1.Pedido)),
    __param(1, (0, typeorm_1.InjectRepository)(itemPedido_entity_1.ItemPedido)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        produto_service_1.ProdutoService,
        estoque_service_1.EstoqueService,
        pagamento_service_1.PagamentoService])
], PedidoService);
//# sourceMappingURL=pedido.service.js.map