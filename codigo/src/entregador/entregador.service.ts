import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entregador } from './entities/entregador.entity';
import { CreateEntregadorDto } from './dto/create-entregador.dto';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class EntregadorService {
  constructor(
    @InjectRepository(Entregador)
    private readonly repo: Repository<Entregador>,

    private readonly usuarioService: UsuarioService, // Supondo que você tenha um serviço de usuário
  ) {}

  async create(dto: CreateEntregadorDto): Promise<Entregador> {
    // 1) valida e-mail único
    if (await this.repo.findOne({ where: { email: dto.email } })) {
      throw new BadRequestException('Este email já está em uso');
    }

    // 2) cria e salva o entregador
    const entregador = await this.repo.save(this.repo.create(dto));

    // 3) gera hash da senha e cria o usuário com role = 'entregador'
    const hash = await bcrypt.hash(dto.senha, 10);
    await this.usuarioService.create(
      entregador.email,
      hash,
      'entregador',
    );

    return entregador;
  }

  findAll(): Promise<Entregador[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Entregador> {
    const entregador = await this.repo.findOne({
      where: { id },
    });
    if (!entregador) throw new NotFoundException(`Entregador ${id} não encontrado`);
    return entregador;
  }
  
  async update(id: number, dto: Partial<CreateEntregadorDto>): Promise<Entregador> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}