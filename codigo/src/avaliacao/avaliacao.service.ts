// src/avaliacao/avaliacao.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import { Avaliacao }        from './entities/avaliacao.entity';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { Pedido }           from 'src/pedido/entities/pedido.entity';
import { StatusPedido }     from 'src/pedido/dto/StatusPedido';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly repo: Repository<Avaliacao>,

    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
  ) {}

  async create(pedidoId: number, dto: CreateAvaliacaoDto): Promise<Avaliacao> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id: pedidoId },
      relations: ['avaliacoes'],
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido ${pedidoId} não encontrado`);
    }
    if (pedido.status !== StatusPedido.FINALIZADO) {
      throw new BadRequestException(
        'Só é possível avaliar pedidos finalizados',
      );
    }
    if (pedido.avaliacoes?.length) {
      throw new ConflictException(
        `Pedido ${pedidoId} já foi avaliado`,
      );
    }
    const aval = this.repo.create({
      nota: dto.nota,
      comentario: dto.comentario,
      pedido: { id: pedidoId },
    });
    return this.repo.save(aval);
  }

  async findByPedidoId(pedidoId: number): Promise<Avaliacao[]> {
    const avaliacoes = await this.repo.find({
      where: { pedido: { id: pedidoId } },
      order: { dataCriacao: 'DESC' },
    });
    if (!avaliacoes.length) {
      throw new NotFoundException(
        `Nenhuma avaliação encontrada para o pedido ${pedidoId}`,
      );
    }
    return avaliacoes;
  }
}
