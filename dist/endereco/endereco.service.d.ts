import { Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
export declare class EnderecoService {
    private readonly repo;
    constructor(repo: Repository<Endereco>);
    create(dto: CreateEnderecoDto): Promise<Endereco>;
    findAll(): Promise<Endereco[]>;
    findOne(id: number): Promise<Endereco>;
    update(id: number, dto: Partial<CreateEnderecoDto>): Promise<Endereco>;
    remove(id: number): Promise<void>;
}
