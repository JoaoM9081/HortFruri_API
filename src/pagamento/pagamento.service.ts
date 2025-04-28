import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { CreatePagamentoDto, StatusPagamento } from './dto/create-pagamento.dto';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private readonly repo: Repository<Pagamento>,
  ) {}

  async create(
    pedidoId: number,
    dto: CreatePagamentoDto,
  ): Promise<Pagamento> {
    // O status é atribuído automaticamente como PENDENTE
    const pagamento = this.repo.create({
      ...dto,
      pedido: { id: pedidoId },
      status: StatusPagamento.PENDENTE, // Atribuindo o status PENDENTE ao criar
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
