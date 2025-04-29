import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Loja } from './entities/loja.entity';
import { CreateLojaDto } from './dto/create-loja.dto';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(Loja)
    private readonly repo: Repository<Loja>,
  ) {}

  async create(dto: CreateLojaDto): Promise<Loja> {
    // Verificar se o CNPJ já existe
    const existingLojaByCnpj = await this.repo.findOne({
      where: { cnpj: dto.cnpj },
    });

    if (existingLojaByCnpj) {
      throw new BadRequestException('Este CNPJ já está em uso');
    }

    // Verificar se o email já existe
    const existingLojaByEmail = await this.repo.findOne({
      where: { email: dto.email },
    });

    if (existingLojaByEmail) {
      throw new BadRequestException('Este email já está em uso');
    }

    // Criar e salvar a loja se CNPJ e email forem únicos
    const loja = this.repo.create(dto); 
    return this.repo.save(loja);
  }

  findAll(): Promise<Loja[]> {
    return this.repo.find({ relations: ['endereco', 'produtos', 'pedidos'] });
  }

  async findOne(id: number): Promise<Loja> {
    const loja = await this.repo.findOne({
      where: { id },
      relations: ['endereco', 'produtos', 'pedidos'],
    });
    
    if (!loja) throw new NotFoundException(`Loja ${id} não encontrada`);
    return loja;
  }
  
  async update(id: number, dto: Partial<CreateLojaDto>): Promise<Loja> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByName(nome: string): Promise<Loja> {
   
    const loja = await this.repo.findOne({
      where: {
        nome: Like(`%${nome.toLowerCase()}%`),  
      },
    });

    if (!loja) {
      throw new NotFoundException(`Loja com nome ${nome} não encontrada`);
    }

    return loja;
  }
}