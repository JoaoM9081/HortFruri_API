import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(dto: CreateConsumidorDto): Promise<Consumidor> {
    const existingConsumidor = await this.repo.findOne({
      where: { email: dto.email },
    });

    if (existingConsumidor) {
      throw new BadRequestException('Este email já está em uso');
    }

    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }
  
  findAll(): Promise<Consumidor[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Consumidor> {
    const consumidor = await this.repo.findOne({ where: { id } }); 
    if (!consumidor) throw new NotFoundException(`Consumidor ${id} não encontrado`);
    return consumidor;
  }
  
  async update(id: number, dto: CreateConsumidorDto): Promise<Consumidor> {
    const consumidor = await this.repo.findOne({ where: { id } }); 
    if (!consumidor) {
      throw new NotFoundException(`Consumidor ${id} não encontrado`);
    }

    await this.repo.update(id, dto);
    return this.findOne(id); 
  }
  
  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}