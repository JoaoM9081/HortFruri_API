import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly repo: Repository<Produto>,
  ) {}

  async create(
    lojaId: number,
    categoriaId: number,
    dto: CreateProdutoDto,
  ): Promise<Produto> {
    const produto = this.repo.create({
      ...dto,
      loja:      { id: lojaId },
      categoria: { id: categoriaId },
    });
    const salvo = await this.repo.save(produto);
    return this.findOne(salvo.id);
  }


  findAll(): Promise<Produto[]> {
    return this.repo.find({ relations: ['loja', 'categoria', 'estoques'] });
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.repo.findOne({
      where: { id }, 
      relations: ['loja', 'categoria', 'estoques', 'estoques.loja'], 
    });
    
    if (!produto) throw new NotFoundException(`Produto ${id} não encontrado`);
    return produto;
  }

  async update(
    id: number,
    dto: Partial<CreateProdutoDto>,
  ): Promise<Produto> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByName(nome: string): Promise<Produto> {
    const produto = await this.repo.findOne({ where: { nome } });
    if (!produto) throw new NotFoundException(`Produto com nome ${nome} não encontrado`);
    return produto;
  }
}