import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(dto: CreateEntregadorDto): Promise<Entregador> {

    const existingEntregador = await this.repo.findOne({
      where: { email: dto.email },  
    });

    if (existingEntregador) {
      throw new BadRequestException('Este email já está em uso');
    }

    const entity = this.repo.create(dto);  
    return this.repo.save(entity);  
  }

  findAll(): Promise<Entregador[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Entregador> {
    const entregador = await this.repo.findOne({
      where: { id },
    });
    if (!entregador) throw new NotFoundException(`Entregador ${id} não encontrado`);
    return entregador;
  }
  
  async update(id: number, dto: Partial<CreateEntregadorDto>): Promise<Entregador> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}