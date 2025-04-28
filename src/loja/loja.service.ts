import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loja } from './entities/loja.entity';
import { CreateLojaDto } from './dto/create-loja.dto';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(Loja)
    private readonly repo: Repository<Loja>,
  ) {}

  async create(
    usuarioId: number,
    enderecoId: number,
    dto: CreateLojaDto,
  ): Promise<Loja> {
    const loja = this.repo.create({
      ...dto,
      usuario: { id: usuarioId },
      endereco: { id: enderecoId },
    });
    return this.repo.save(loja);
  }

  findAll(): Promise<Loja[]> {
    return this.repo.find({ relations: ['usuario', 'endereco', 'produtos'] });
  }

  async findOne(id: number): Promise<Loja> {
    const loja = await this.repo.findOne({
      where: { id }, 
      relations: ['usuario', 'endereco', 'produtos'], 
    });
    
    if (!loja) throw new NotFoundException(`Loja ${id} não encontrada`);
    return loja;
  }
  
  async update(
    id: number,
    dto: Partial<CreateLojaDto>,
  ): Promise<Loja> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByName(nome: string): Promise<Loja> {
    const loja = await this.repo.findOne({ where: { nome } });
    if (!loja) throw new NotFoundException(`Loja com nome ${nome} não encontrada`);
    return loja;
  }
}