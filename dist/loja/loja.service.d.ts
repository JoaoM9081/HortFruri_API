import { Repository } from 'typeorm';
import { Loja } from './entities/loja.entity';
import { CreateLojaDto } from './dto/create-loja.dto';
export declare class LojaService {
    private readonly repo;
    constructor(repo: Repository<Loja>);
    create(usuarioId: number, enderecoId: number, dto: CreateLojaDto): Promise<Loja>;
    findAll(): Promise<Loja[]>;
    findOne(id: number): Promise<Loja>;
    update(id: number, dto: Partial<CreateLojaDto>): Promise<Loja>;
    remove(id: number): Promise<void>;
    findByName(nome: string): Promise<Loja>;
}
