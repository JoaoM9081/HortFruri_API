import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { FormaPagamento, StatusPagamento } from './dto/create-pagamento.dto';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private readonly repo: Repository<Pagamento>,

    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
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
}