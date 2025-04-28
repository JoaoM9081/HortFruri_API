// src/categoria/categoria.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  async create(dto: CreateCategoriaDto): Promise<Categoria> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll(): Promise<Categoria[]> {
    return this.repo.find({ relations: ['produtos'] });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.repo.findOne({
      where: { id },
      relations: ['produtos'],
    });
    
    if (!categoria) throw new NotFoundException(`Categoria ${id} não encontrada`);
    return categoria;
  }

  async update(id: number, dto: Partial<CreateCategoriaDto>): Promise<Categoria> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}