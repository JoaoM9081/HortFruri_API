import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private readonly repo: Repository<Endereco>,
  ) {}

  async create(dto: CreateEnderecoDto): Promise<Endereco> {
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  findAll(): Promise<Endereco[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Endereco> {
    const e = await this.repo.findOne({
      where: { id },
    });
    if (!e) throw new NotFoundException(`Endereço ${id} não encontrado`);
    return e;
  }
  
  async update(id: number, dto: Partial<CreateEnderecoDto>): Promise<Endereco> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}