import { Repository } from 'typeorm';
import { Consumidor } from './entities/consumidor.entity';
import { CreateConsumidorDto } from './dto/create-consumidor.dto';
export declare class ConsumidorService {
    private readonly repo;
    constructor(repo: Repository<Consumidor>);
    create(usuarioId: number, dto: CreateConsumidorDto): Promise<Consumidor>;
    findAll(): Promise<Consumidor[]>;
    findOne(id: number): Promise<Consumidor>;
    update(id: number, dto: Partial<CreateConsumidorDto>): Promise<Consumidor>;
    remove(id: number): Promise<void>;
}
