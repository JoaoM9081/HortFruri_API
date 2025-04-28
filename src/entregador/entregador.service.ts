import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entregador } from './entities/entregador.entity';
import { CreateEntregadorDto } from './dto/create-entregador.dto';

@Injectable()
export class EntregadorService {
  constructor(
    @InjectRepository(Entregador)
    private readonly repo: Repository<Entregador>,
  ) {}

  async create(usuarioId: number, dto: CreateEntregadorDto): Promise<Entregador> {
    const entity = this.repo.create({ ...dto, usuario: { id: usuarioId } });
    return this.repo.save(entity);
  }

  findAll(): Promise<Entregador[]> {
    return this.repo.find({ relations: ['usuario', 'pedidos'] });
  }

  async findOne(id: number): Promise<Entregador> {
    const e = await this.repo.findOne({
      where: { id },
      relations: ['usuario', 'pedidos'],
    });
    if (!e) throw new NotFoundException(`Entregador ${id} não encontrado`);
    return e;
  }
  
  async update(id: number, dto: Partial<CreateEntregadorDto>): Promise<Entregador> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}