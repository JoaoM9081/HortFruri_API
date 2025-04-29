import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { CreatePagamentoDto, StatusPagamento } from './dto/create-pagamento.dto';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private readonly repo: Repository<Pagamento>,
    
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
  ) {}

  async create(pedidoId: number, dto: CreatePagamentoDto): Promise<Pagamento> {
    const pedido = await this.pedidoRepo.findOne({ where: { id: pedidoId } });

    if (!pedido) {
      throw new NotFoundException(`Pedido ${pedidoId} não encontrado`);
    }

    const pagamento = this.repo.create({
      ...dto,
      pedido: { id: pedidoId },
      status: StatusPagamento.PENDENTE,
      valorPago: pedido.total, // Aqui você usa o total do pedido
    });

    return this.repo.save(pagamento);
  }

  findAll(): Promise<Pagamento[]> {
    return this.repo.find({ relations: ['pedido'] });
  }

  async findOne(id: number): Promise<Pagamento> {
    const pg = await this.repo.findOne({ where: { id }, relations: ['pedido'] });
    if (!pg) throw new NotFoundException(`Pagamento ${id} não encontrado`);
    return pg;
  }

  async update(id: number, dto: Partial<CreatePagamentoDto>): Promise<Pagamento> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
