import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { ItemPedido } from 'src/itemPedido/entities/itemPedido.entity';
import { ProdutoService } from 'src/produto/produto.service';
import { EstoqueService } from 'src/estoque/estoque.service';
import { PagamentoService } from 'src/pagamento/pagamento.service';
import { CreateItemPedidoDto } from 'src/itemPedido/dto/create-itemPedido.dto';
import { FormaPagamento, StatusPagamento } from 'src/pagamento/dto/create-pagamento.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { StatusPedido } from './dto/StatusPedido';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    @InjectRepository(ItemPedido)
    private readonly itemRepo: Repository<ItemPedido>,
    private readonly produtoService: ProdutoService,
    private readonly estoqueService: EstoqueService,
    private readonly pagamentoService: PagamentoService,
  ) {}

  async create(
    consumidorId: number,
    lojaId: number,
    dto: CreatePedidoDto,
  ): Promise<Pedido> {
    const pedido = this.pedidoRepo.create({
      ...dto,
      consumidor: { id: consumidorId },
      loja: { id: lojaId },
      status: StatusPedido.PENDENTE,
    });
    return this.pedidoRepo.save(pedido);
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepo.find({ relations: ['consumidor', 'loja', 'entregador', 'itens', 'pagamentos'] });
  }

  async findOne(id: number): Promise<Pedido> {
    const pd = await this.pedidoRepo.findOne({
      where: { id },
      relations: ['consumidor', 'loja', 'entregador', 'itens', 'pagamentos'],
    });
    if (!pd) throw new NotFoundException(`Pedido ${id} não encontrado`);
    return pd;
  }

  async update(id: number, dto: Partial<CreatePedidoDto>): Promise<Pedido> {
    await this.pedidoRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.pedidoRepo.delete(id);
  }

  async pegarOuCriarCarrinho(consumidorId: number, lojaId: number): Promise<Pedido> {
    let carrinho = await this.pedidoRepo.findOne({
      where: {
        consumidor: { id: consumidorId },
        loja:        { id: lojaId },
        status:      StatusPedido.PENDENTE
      },
      relations: ['itens', 'itens.produto']
    });
    if (!carrinho) {
      carrinho = this.pedidoRepo.create({
        consumidor: { id: consumidorId },
        loja:        { id: lojaId },
        status:      StatusPedido.PENDENTE,
        total:       0,
      });
      carrinho = await this.pedidoRepo.save(carrinho);
    }
    return carrinho;
  }

  async adicionarItemCarrinho(
    consumidorId: number,
    lojaId: number,
    produtoId: number,
    dto: CreateItemPedidoDto
  ): Promise<Pedido> {
    const carrinho = await this.pegarOuCriarCarrinho(consumidorId, lojaId);
    const produto  = await this.produtoService.findOne(produtoId);

    const estoqueLoja = produto.estoques.find(e => e.loja.id === lojaId);
    if (!estoqueLoja || dto.quantidade > estoqueLoja.quantidadeDisponivel) {
      throw new BadRequestException('Quantidade solicitada excede o estoque disponível');
    }

    let item = await this.itemRepo.findOne({
      where: { pedido: { id: carrinho.id }, produto: { id: produtoId } }
    });
    if (item) {
      item.quantidade += dto.quantidade;
    } else {
      item = this.itemRepo.create({
        pedido:        { id: carrinho.id },
        produto:       { id: produtoId },
        quantidade:     dto.quantidade,
        precoUnitario: produto.preco
      });
    }
    await this.itemRepo.save(item);
    return this.recalcularTotal(carrinho.id);
  }

  async removerItemCarrinho(pedidoId: number, itemId: number): Promise<Pedido> {
    const item = await this.itemRepo.findOne({
      where: { id: itemId, pedido: { id: pedidoId } }
    });
    if (!item) throw new NotFoundException(`Item ${itemId} não encontrado no carrinho ${pedidoId}`);
    await this.itemRepo.delete(itemId);
    return this.recalcularTotal(pedidoId);
  }

  private async recalcularTotal(pedidoId: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id: pedidoId },
      relations: ['itens']
    });
  
    if (!pedido) {
      throw new NotFoundException(`Pedido ${pedidoId} não encontrado`);
    }
  
    pedido.total = pedido.itens.reduce((soma, i) => soma + i.precoUnitario * i.quantidade, 0);
    return this.pedidoRepo.save(pedido);
  }
  
  async iniciarCheckout(pedidoId: number, forma: FormaPagamento) {
    const pedido = await this.recalcularTotal(pedidoId);
    
    if (pedido.itens.length === 0) throw new BadRequestException('Carrinho vazio');
    
    // Criando o pagamento com o status "PENDENTE"
    const pagamento = await this.pagamentoService.create(pedidoId, {
      formaPagamento: forma,
    });
    
    pedido.status = StatusPedido.ABERTO_PARA_PAGAMENTO;
    await this.pedidoRepo.save(pedido);
    
    return pagamento;
  }

  async confirmarPagamento(pagamentoId: number) {
    const pagamento = await this.pagamentoService.findOne(pagamentoId);
    if (pagamento.status !== StatusPagamento.CONCLUIDO) {
      throw new BadRequestException('Pagamento ainda não concluído');
    }
  
    const pedido = await this.pedidoRepo.findOne({
      where: { id: pagamento.pedido.id },
      relations: ['itens', 'itens.produto', 'loja']
    });
  
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${pagamento.pedido.id} não encontrado`);
    }
  
    for (const item of pedido.itens) {
      await this.estoqueService.decrementStock(pedido.loja.id, item.produto.id, item.quantidade);
    }
  
    pedido.status = StatusPedido.FINALIZADO;
    return this.pedidoRepo.save(pedido);
  }
}
