import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumidor } from './entities/consumidor.entity';
import { CreateConsumidorDto } from './dto/create-consumidor.dto';

@Injectable()
export class ConsumidorService {
  constructor(
    @InjectRepository(Consumidor)
    private readonly repo: Repository<Consumidor>,
  ) {}

  async create(usuarioId: number, dto: CreateConsumidorDto): Promise<Consumidor> {
    const entity = this.repo.create({
      ...dto,
      usuario: { id: usuarioId },
    });
    return this.repo.save(entity);
  }

  findAll(): Promise<Consumidor[]> {
    return this.repo.find({ relations: ['usuario', 'pedidos'] });
  }

  async findOne(id: number): Promise<Consumidor> {
    const c = await this.repo.findOne({
      where: { id },
      relations: ['usuario', 'pedidos'],
    });
    if (!c) throw new NotFoundException(`Consumidor ${id} não encontrado`);
    return c;
  }

  async update(id: number, dto: Partial<CreateConsumidorDto>): Promise<Consumidor> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}