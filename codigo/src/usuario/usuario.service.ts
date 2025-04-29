import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  findAll(): Promise<Usuario[]> {
    return this.repo.find({ relations: ['consumidor', 'entregador', 'loja'] });
  }

  async findOne(id: number): Promise<Usuario> {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['consumidor', 'entregador', 'loja'],
    });
    if (!user) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return user;
  }

  async update(id: number, dto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = await this.repo.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuário ${id} não encontrado`);
    }
  
    // Aqui, substituímos completamente os dados do usuário usando QueryBuilder
    await this.repo.createQueryBuilder()
      .update(Usuario)
      .set(dto)  // Substitui todos os campos com os valores do DTO
      .where("id = :id", { id })
      .execute();  // Executa a atualização
  
    return this.findOne(id);  // Retorna o usuário atualizado
  }
  
  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}