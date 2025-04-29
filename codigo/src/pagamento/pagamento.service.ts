import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { FormaPagamento, StatusPagamento } from './dto/create-pagamento.dto';
import { StatusPedido } from 'src/pedido/dto/StatusPedido';
import { EstoqueService } from 'src/estoque/estoque.service';
import { PagamentoResponseDto } from './dto/PagamentoResponseDto';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private readonly repo: Repository<Pagamento>,

    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    private readonly estoqueService: EstoqueService,
  ) {}

  async createPagamento(
    pedidoId: number,
    forma: FormaPagamento,
  ): Promise<Pagamento> {
    const pedido = await this.pedidoRepo.findOne({ where: { id: pedidoId } });
    if (!pedido) throw new NotFoundException(`Pedido ${pedidoId} não encontrado`);

    const existente = await this.repo.findOne({
      where: { pedido: { id: pedidoId }, status: StatusPagamento.PENDENTE },
    });
    if (existente) {
      return existente;
    }
  
    const pagamento = this.repo.create({
      pedido: { id: pedidoId },
      formaPagamento: forma,
      valorPago: pedido.total,
      status: StatusPagamento.PENDENTE,
    });
    return this.repo.save(pagamento);
  }

  async updateStatus(
    pagamentoId: number,
    status: StatusPagamento,
  ): Promise<Pagamento> {
    const pg = await this.repo.findOne({
      where: { id: pagamentoId },
      relations: ['pedido'],
    });
    if (!pg) {
      throw new NotFoundException(`Pagamento ${pagamentoId} não encontrado`);
    }
    pg.status = status;
    return this.repo.save(pg);
  }

  async pagar(
    pedidoId: number,
    forma: FormaPagamento
  ): Promise<{ pagamento: Pagamento; pedido: Pedido }> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id: pedidoId },
      relations: ['itens', 'itens.produto', 'pagamentos', 'loja']
    });
    if (!pedido) throw new NotFoundException(`Pedido ${pedidoId} não encontrado`);
    if (pedido.status !== StatusPedido.PENDENTE) {
      throw new BadRequestException('Somente pedidos PENDENTE podem ser pagos');
    }
    if (!pedido.itens.length) {
      throw new BadRequestException('Não é possível pagar um pedido sem itens');
    }
    if (pedido.pagamentos.some(p => p.status === StatusPagamento.PENDENTE)) {
      throw new BadRequestException('Já existe um pagamento pendente para este pedido');
    }

    const valorTotal = pedido.itens.reduce(
      (s, i) => s + i.precoUnitario * i.quantidade,
      0
    );

    const pagamento = this.repo.create({
      pedido:         { id: pedidoId },
      formaPagamento: forma,
      status:         StatusPagamento.PENDENTE,
      valorPago:      valorTotal,
      dataPagamento:  new Date(),
    });
    await this.repo.save(pagamento);

    pagamento.status = StatusPagamento.CONCLUIDO;
    await this.repo.save(pagamento);

    for (const item of pedido.itens) {
      await this.estoqueService.decrementStock(
        pedido.loja.id,
        item.produto.id,
        item.quantidade,
      );
    }

    pedido.status = StatusPedido.FINALIZADO;
    const pedidoFinalizado = await this.pedidoRepo.save(pedido);

    return { pagamento, pedido: pedidoFinalizado };
  }
}