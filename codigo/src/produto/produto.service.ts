import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { Loja } from 'src/loja/entities/loja.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { join } from 'path';
import { unlink } from 'fs/promises';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly repo: Repository<Produto>,
     @InjectRepository(Loja)
        private readonly lojaRepo: Repository<Loja>,
         @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  async create(
    lojaId: number,
    categoriaId: number,
    dto: CreateProdutoDto,
  ): Promise<Produto> {

     const loja = await this.lojaRepo.findOne({ where: { id: lojaId } });
    if (!loja) {
      throw new NotFoundException(`Loja ${lojaId} não encontrada`);
    }

     const categoria = await this.categoriaRepo.findOne({ where: { id: categoriaId } });
    if (!categoria) {
      throw new NotFoundException(`Categoria ${categoriaId} não encontrada`);
    }

    const produto = this.repo.create({
      ...dto,
      loja:      { id: lojaId },
      categoria: { id: categoriaId },
    });
    const salvo = await this.repo.save(produto);
    return this.findOne(salvo.id);
  }

  async atualizarImagem(id: number, imagemUrl: string): Promise<Produto> {
    const produto = await this.repo.findOne({ where: { id } });
    if (!produto) {
      throw new NotFoundException(`Produto ${id} não encontrado`);
    }

    if (produto.imagemUrl) {
      const nomeArquivoAntigo = produto.imagemUrl.replace(/^\/uploads\//, '');
      const caminhoArquivoAntigo = join(process.cwd(), 'uploads', nomeArquivoAntigo);
      try {
        await unlink(caminhoArquivoAntigo);
      } catch {
      }
    }

    await this.repo.update(id, { imagemUrl });

    const atualizado = await this.repo.findOne({ where: { id } });
    if (!atualizado) {
      throw new NotFoundException(`Produto ${id} não encontrado após atualização`);
    }
    return atualizado;
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
    const produto = await this.repo.findOne({
      where: {
        nome: Like(`%${nome.toLowerCase()}%`),  
      },
      relations: ['estoques', 'estoques.loja'] 
    });

    if (!produto) {
      throw new NotFoundException(`Produto com nome ${nome} não encontrado`);
    }

    return produto;
  }
}