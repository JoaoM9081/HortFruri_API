import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Loja } from './entities/loja.entity';
import { CreateLojaDto } from './dto/create-loja.dto';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(Loja)
    private readonly repo: Repository<Loja>,
    @InjectRepository(Endereco)
    private readonly enderecoRepo: Repository<Endereco>,

    private readonly usuarioService: UsuarioService, // Supondo que você tenha um serviço de usuário
  ) {}

  async create(dto: CreateLojaDto): Promise<Loja> {
    // 1) Verificar CNPJ único
    if (await this.repo.findOne({ where: { cnpj: dto.cnpj } })) {
      throw new BadRequestException('Este CNPJ já está em uso');
    }

    // 2) Verificar e-mail único
    if (await this.repo.findOne({ where: { email: dto.email } })) {
      throw new BadRequestException('Este email já está em uso');
    }

    // 3) Validar endereço
    const endereco = await this.enderecoRepo.findOne({
      where: { id: dto.enderecoId },
    });
    if (!endereco) {
      throw new BadRequestException(`Endereço ${dto.enderecoId} não existe`);
    }

    // 4) Criar e salvar a Loja
    const lojaEntity = this.repo.create({
      nome:     dto.nome,
      cnpj:     dto.cnpj,
      telefone: dto.telefone,
      email:    dto.email,
      senha:    dto.senha,
      endereco,
    });
    const loja = await this.repo.save(lojaEntity);

    // 5) Gerar hash da senha e criar usuário com role = 'loja'
    const hash = await bcrypt.hash(dto.senha, 10);
    await this.usuarioService.create(loja.email, hash, 'loja');

    return loja;
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
  
  async update(id: number, dto: CreateLojaDto): Promise<Loja> {
    // 1) carrega a loja existente
    const loja = await this.repo.findOne({
      where: { id },
      relations: ['endereco', 'produtos', 'pedidos'],
    });
    if (!loja) {
      throw new NotFoundException(`Loja ${id} não encontrada`);
    }

    // 2) carrega e valida o novo Endereco
    const endereco = await this.enderecoRepo.findOne({
      where: { id: dto.enderecoId },
    });
    if (!endereco) {
      throw new BadRequestException(`Endereço ${dto.enderecoId} não existe`);
    }

    // 3) atribui todos os campos do DTO
    loja.nome      = dto.nome;
    loja.cnpj      = dto.cnpj;
    loja.telefone  = dto.telefone;
    loja.email     = dto.email;
    loja.senha     = dto.senha;
    loja.endereco  = endereco;

    // 4) salva e retorna
    return this.repo.save(loja);
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