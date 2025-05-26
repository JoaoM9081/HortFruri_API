import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumidor } from './entities/consumidor.entity';
import { CreateConsumidorDto } from './dto/create-consumidor.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ConsumidorService {
  constructor(
    @InjectRepository(Consumidor)
    private readonly repo: Repository<Consumidor>,

    private readonly usuarioService: UsuarioService,
  ) {}

  async create(dto: CreateConsumidorDto): Promise<Consumidor> {
    // 1) verifica se o e-mail já existe
    const existingConsumidor = await this.repo.findOne({
      where: { email: dto.email },
    });
    if (existingConsumidor) {
      throw new BadRequestException('Este email já está em uso');
    }

    // 2) cria e salva o consumidor
    const entity = this.repo.create(dto);
    const consumidor = await this.repo.save(entity);

    // 3) hash da senha e criação do usuário
    const hash = await bcrypt.hash(dto.senha, 10);
    await this.usuarioService.create(
      consumidor.email,
      hash,
      'consumidor',
    );

    // 4) retorna o consumidor salvo
    return consumidor;
  }
  
  findAll(): Promise<Consumidor[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Consumidor> {
    const consumidor = await this.repo.findOne({ where: { id } }); 
    if (!consumidor) throw new NotFoundException(`Consumidor ${id} não encontrado`);
    return consumidor;
  }
  
  async update(id: number, dto: CreateConsumidorDto): Promise<Consumidor> {
    const consumidor = await this.repo.findOne({ where: { id } }); 
    if (!consumidor) {
      throw new NotFoundException(`Consumidor ${id} não encontrado`);
    }

    await this.repo.update(id, dto);
    return this.findOne(id); 
  }
  
  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}