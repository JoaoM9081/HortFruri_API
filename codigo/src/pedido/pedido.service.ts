import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Consumidor } from 'src/consumidor/entities/consumidor.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { Entregador } from 'src/entregador/entities/entregador.entity';
import { StatusPagamento } from 'src/pagamento/dto/create-pagamento.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    @InjectRepository(ItemPedido)
    private readonly itemRepo: Repository<ItemPedido>,
    private readonly produtoService: ProdutoService,
    
    @InjectRepository(Endereco)     
    private readonly enderecoRepo: Repository<Endereco>,

    @InjectRepository(Consumidor)
    private readonly consumidorRepo: Repository<Consumidor>,

    @InjectRepository(Loja)
    private readonly lojaRepo: Repository<Loja>,

    @InjectRepository(Entregador)
    private readonly entregadorRepo: Repository<Entregador>,
  ) {}

  async create(consumidorId: number, lojaId: number, dto: CreatePedidoDto): Promise<Pedido> {

    const consumidor = await this.consumidorRepo.findOne({ where: { id: consumidorId } });
    if (!consumidor) {
      throw new NotFoundException(`Consumidor ${consumidorId} não encontrado`);
    }

    // 2) valida loja
    const loja = await this.lojaRepo.findOne({ where: { id: lojaId } });
    if (!loja) {
      throw new NotFoundException(`Loja ${lojaId} não encontrada`);
    }

    const endereco = await this.enderecoRepo.findOne({
    where: { id: dto.enderecoId },
    });
    if (!endereco) {
      throw new BadRequestException(
        `Endereço ${dto.enderecoId} não existe`
      );
    }

    const pedido = this.pedidoRepo.create({
      consumidor: { id: consumidorId },
      loja:        { id: lojaId },
      endereco:   endereco,
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

  async atribuirEntregador(
  pedidoId: number,
  entregadorId: number,
): Promise<Pedido> {
    // 1) carrega o pedido com entregador (e se quiser, itens/pagamentos)
    const pedido = await this.pedidoRepo.findOne({
      where: { id: pedidoId },
      relations: ['entregador'],
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido ${pedidoId} não encontrado`);
    }

    // 2) só pedidos FINALIZADO podem receber entregador
    if (pedido.status !== StatusPedido.FINALIZADO) {
      throw new BadRequestException(
        'Só é possível atribuir entregador a pedidos finalizados',
      );
    }

    if (pedido.entregador) {
    throw new ConflictException(
      `Pedido ${pedidoId} já possui entregador atribuído`,
    );
  }

    // 3) carrega o entregador
    const entregador = await this.entregadorRepo.findOne({
      where: { id: entregadorId },
    });
    if (!entregador) {
      throw new NotFoundException(`Entregador ${entregadorId} não encontrado`);
    }

    // 4) vincula e salva
    pedido.entregador = entregador;
    return this.pedidoRepo.save(pedido);
  }
}