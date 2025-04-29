import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
export declare class CategoriaService {
    private readonly repo;
    constructor(repo: Repository<Categoria>);
    create(dto: CreateCategoriaDto): Promise<Categoria>;
    findAll(): Promise<Categoria[]>;
    findOne(id: number): Promise<Categoria>;
    update(id: number, dto: Partial<CreateCategoriaDto>): Promise<Categoria>;
    remove(id: number): Promise<void>;
}
