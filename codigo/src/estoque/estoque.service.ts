import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estoque } from './entities/estoque.entity';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { ProdutoService } from '../produto/produto.service';
import { LojaService } from '../loja/loja.service';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Estoque)
    private readonly repo: Repository<Estoque>,
    private readonly produtoService: ProdutoService,
    private readonly lojaService: LojaService,
  ) {}

  async create(
    produtoId: number,
    lojaId: number,
    dto: CreateEstoqueDto,
  ): Promise<Estoque> {
    // Verifica se o produto e a loja existem
    await this.produtoService.findOne(produtoId);
    await this.lojaService.findOne(lojaId);

    const estoque = this.repo.create({
      ...dto,
      produto: { id: produtoId },
      loja: { id: lojaId },
    });

    return this.repo.save(estoque);
  }

  findAll(): Promise<Estoque[]> {
    return this.repo.find({ relations: ['produto', 'loja'] });
  }

  async findOne(id: number): Promise<Estoque> {
    const e = await this.repo.findOne({ where: { id }, relations: ['produto', 'loja'] });
    if (!e) throw new NotFoundException(`Estoque ${id} não encontrado`);
    return e;
  }

  async update(id: number, dto: Partial<CreateEstoqueDto>): Promise<Estoque> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async decrementStock(lojaId: number, produtoId: number, quantidade: number): Promise<void> {
    const estoque = await this.repo.findOne({
      where: { loja: { id: lojaId }, produto: { id: produtoId } },
    });

    if (!estoque) throw new NotFoundException('Estoque não encontrado');

    // Verifica se há estoque suficiente
    if (estoque.quantidadeDisponivel < quantidade) {
      throw new BadRequestException('Estoque insuficiente');
    }

    // Decrementa a quantidade
    estoque.quantidadeDisponivel -= quantidade;

    await this.repo.save(estoque);
  }
}