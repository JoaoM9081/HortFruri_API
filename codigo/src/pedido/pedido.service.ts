import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { ItemPedido } from 'src/itemPedido/entities/itemPedido.entity';
import { ProdutoService } from 'src/produto/produto.service';
import { EstoqueService } from 'src/estoque/estoque.service';
import { PagamentoService } from 'src/pagamento/pagamento.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { StatusPedido } from './dto/StatusPedido';
import { CreateItemPedidoDto } from '../itemPedido/dto/createItemPedidoDto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    @InjectRepository(ItemPedido)
    private readonly itemRepo: Repository<ItemPedido>,
    private readonly produtoService: ProdutoService,
  ) {}

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
        const produto = await this.produtoService.findByName(itemDto.produtoNome);
        const estoque  = produto.estoques.find(e => e.loja.id === lojaId);
        if (!estoque || itemDto.quantidade > estoque.quantidadeDisponivel) {
          throw new BadRequestException(`Estoque insuficiente para ${produto.nome}`);
        }
        const item = this.itemRepo.create({
          pedido:        { id: salvo.id },
          produto:       { id: produto.id },
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

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepo.find({
      relations: [
        'consumidor','loja','entregador',
        'itens','itens.produto','pagamentos'
      ]
    });
  }

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

  async update(id: number, dto: Partial<CreatePedidoDto>): Promise<Pedido> {
    await this.pedidoRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.pedidoRepo.delete(id);
  }

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

  async findByConsumidor(consumidorId: number): Promise<Pedido[]> {
    return this.pedidoRepo.find({
      where: { consumidor: { id: consumidorId } },
      relations: [
        'consumidor',
        'loja',
        'entregador',
        'itens',
        'itens.produto',
        'pagamentos',
      ],
      order: { dataCriacao: 'DESC' }, 
    });
  }
}