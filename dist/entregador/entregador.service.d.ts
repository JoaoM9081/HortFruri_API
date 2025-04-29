import { Repository } from 'typeorm';
import { Entregador } from './entities/entregador.entity';
import { CreateEntregadorDto } from './dto/create-entregador.dto';
export declare class EntregadorService {
    private readonly repo;
    constructor(repo: Repository<Entregador>);
    create(usuarioId: number, dto: CreateEntregadorDto): Promise<Entregador>;
    findAll(): Promise<Entregador[]>;
    findOne(id: number): Promise<Entregador>;
    update(id: number, dto: Partial<CreateEntregadorDto>): Promise<Entregador>;
    remove(id: number): Promise<void>;
}
