// src/usuario/usuario.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository }   from '@nestjs/typeorm';
import { Repository }         from 'typeorm';
import { Usuario }            from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  async create(email: string, passwordHash: string, role: Usuario['role']): Promise<Usuario> {
    if (await this.repo.findOne({ where: { email } })) {
      throw new BadRequestException('E-mail já cadastrado');
    }
    const u = this.repo.create({ email, password: passwordHash, role });
    return this.repo.save(u);
  }

  async findByEmail(email: string): Promise<Usuario> {
    const u = await this.repo.findOne({ where: { email } });
    if (!u) throw new NotFoundException(`Usuário ${email} não encontrado`);
    return u;
  }

  async createAdmin(email: string, plain: string, role: Usuario['role'] = 'admin') {
    if (await this.repo.findOne({ where: { email } }))
      throw new BadRequestException('CPF já cadastrado');
    const password = await bcrypt.hash(plain, 10);
    return this.repo.save(this.repo.create({ email, password, role }));
  }
}
