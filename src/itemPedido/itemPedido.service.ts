import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemPedido } from './entities/itemPedido.entity';
import { CreateItemPedidoDto } from './dto/create-itemPedido.dto';

@Injectable()
export class ItemPedidoService {
  constructor(
    @InjectRepository(ItemPedido)
    private readonly repo: Repository<ItemPedido>,
  ) {}

  async create(
    pedidoId: number,
    produtoId: number,
    dto: CreateItemPedidoDto,
  ): Promise<ItemPedido> {
    const item = this.repo.create({
      ...dto,
      pedido: { id: pedidoId },
      produto: { id: produtoId },
    });
    return this.repo.save(item);
  }

  findAll(): Promise<ItemPedido[]> {
    return this.repo.find({ relations: ['pedido', 'produto'] });
  }

  async findOne(id: number): Promise<ItemPedido> {
    const ip = await this.repo.findOne({ where: { id }, relations: ['pedido', 'produto'] });
    if (!ip) throw new NotFoundException(`ItemPedido ${id} não encontrado`);
    return ip;
  }

  async update(id: number, dto: Partial<CreateItemPedidoDto>): Promise<ItemPedido> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}