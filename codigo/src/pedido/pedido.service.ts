import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { ItemPedido } from 'src/itemPedido/entities/itemPedido.entity';
import { ProdutoService } from 'src/produto/produto.service';
import { EstoqueService } from 'src/estoque/estoque.service';
import { PagamentoService } from 'src/pagamento/pagamento.service';
import { FormaPagamento, StatusPagamento } from 'src/pagamento/dto/create-pagamento.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { StatusPedido } from './dto/StatusPedido';
import { CreateItemPedidoDto } from './dto/createItemPedidoDto';

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

  /** Cria pedido + todos os itens de uma vez */
  async create(consumidorId: number, lojaId: number, dto: CreatePedidoDto): Promise<Pedido> {
    const pedido = this.pedidoRepo.create({
      consumidor: { id: consumidorId },
      loja:        { id: lojaId },
      status:      StatusPedido.PENDENTE,
      total:       0,
    });
    const salvo = await this.pedidoRepo.save(pedido);

    const itensEntity = await Promise.all(
      dto.itens.map(async itemDto => {
        const produto = await this.produtoService.findOne(itemDto.produtoId);
        const estoque  = produto.estoques.find(e => e.loja.id === lojaId);
        if (!estoque || itemDto.quantidade > estoque.quantidadeDisponivel) {
          throw new BadRequestException(`Estoque insuficiente para ${produto.nome}`);
        }
        const item = this.itemRepo.create({
          pedido:        { id: salvo.id },
          produto:       { id: itemDto.produtoId },
          quantidade:     itemDto.quantidade,
          precoUnitario:  produto.preco,
        });
        return this.itemRepo.save(item);
      })
    );

    salvo.itens = itensEntity;
    salvo.total = itensEntity.reduce((s, i) => s + i.precoUnitario * i.quantidade, 0);
    return this.pedidoRepo.save(salvo);
  }

  /** Lista todos os pedidos */
  findAll(): Promise<Pedido[]> {
    return this.pedidoRepo.find({
      relations: [
        'consumidor','loja','entregador',
        'itens','itens.produto','pagamentos'
      ]
    });
  }

  /** Busca um pedido por ID */
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: [
        'consumidor','loja','entregador',
        'itens','itens.produto','pagamentos'
      ]
    });
    if (!pedido) throw new NotFoundException(`Pedido ${id} não encontrado`);
    return pedido;
  }

  /** Atualiza apenas campos de cabeçalho do pedido */
  async update(id: number, dto: Partial<CreatePedidoDto>): Promise<Pedido> {
    await this.pedidoRepo.update(id, dto);
    return this.findOne(id);
  }

  /** Remove um pedido inteiro */
  async remove(id: number): Promise<void> {
    await this.pedidoRepo.delete(id);
  }

  /** Adiciona ou atualiza um item em um pedido PENDENTE */
  async adicionarItemCarrinho(
    pedidoId: number,
    produtoId: number,
    dto: CreateItemPedidoDto,
  ): Promise<Pedido> {
    const pedido  = await this.findOne(pedidoId);
    if (pedido.status !== StatusPedido.PENDENTE) {
      throw new BadRequestException('Só é possível alterar pedidos pendentes');
    }
    const produto = await this.produtoService.findOne(produtoId);
    const estoque = produto.estoques.find(e => e.loja.id === pedido.loja.id);
    if (!estoque || dto.quantidade > estoque.quantidadeDisponivel) {
      throw new BadRequestException(`Estoque insuficiente para ${produto.nome}`);
    }

    let item = await this.itemRepo.findOne({
      where: { pedido: { id: pedidoId }, produto: { id: produtoId } }
    });
    if (item) {
      item.quantidade += dto.quantidade;
    } else {
      item = this.itemRepo.create({
        pedido:       { id: pedidoId },
        produto:      { id: produtoId },
        quantidade:    dto.quantidade,
        precoUnitario: produto.preco,
      });
    }
    await this.itemRepo.save(item);
    return this.recalcularTotal(pedidoId);
  }

  /** Remove um item de um pedido PENDENTE */
  async removerItemCarrinho(pedidoId: number, itemId: number): Promise<Pedido> {
    const item = await this.itemRepo.findOne({
      where: { id: itemId, pedido: { id: pedidoId } }
    });
    if (!item) {
      throw new NotFoundException(`Item ${itemId} não existe no pedido ${pedidoId}`);
    }
    await this.itemRepo.delete(itemId);
    return this.recalcularTotal(pedidoId);
  }

  /** Atualiza o total baseado nos itens atuais */
  private async recalcularTotal(pedidoId: number): Promise<Pedido> {
    const pedido = await this.findOne(pedidoId);
    pedido.total = pedido.itens.reduce((s, i) => s + i.precoUnitario * i.quantidade, 0);
    return this.pedidoRepo.save(pedido);
  }

  /** Cria um pagamento e abre o pedido para pagamento */
  async iniciarCheckout(pedidoId: number, forma: FormaPagamento) {
    const pedido = await this.recalcularTotal(pedidoId);
    if (pedido.itens.length === 0) {
      throw new BadRequestException('Carrinho vazio');
    }
    const existePendente = pedido.pagamentos.some(p => p.status === StatusPagamento.PENDENTE);
    if (existePendente) {
      throw new BadRequestException('Já existe pagamento pendente');
    }
    const pagamento = await this.pagamentoService.create(pedidoId, {
      formaPagamento: forma,
      valorPago:      pedido.total,
    });
    pedido.status = StatusPedido.ABERTO_PARA_PAGAMENTO;
    await this.pedidoRepo.save(pedido);
    return pagamento;
  }

  /** Confirma um pagamento, debita estoque e finaliza o pedido */
  async confirmarPagamento(pagamentoId: number) {
    const pagamento = await this.pagamentoService.findOne(pagamentoId);
    if (pagamento.status !== StatusPagamento.CONCLUIDO) {
      throw new BadRequestException('Pagamento não concluído');
    }
    const pedido = await this.findOne(pagamento.pedido.id);
    if (pedido.status !== StatusPedido.ABERTO_PARA_PAGAMENTO) {
      throw new BadRequestException('Pedido não está em aberto para pagamento');
    }
    for (const item of pedido.itens) {
      await this.estoqueService.decrementStock(pedido.loja.id, item.produto.id, item.quantidade);
    }
    pedido.status = StatusPedido.FINALIZADO;
    return this.pedidoRepo.save(pedido);
  }
}