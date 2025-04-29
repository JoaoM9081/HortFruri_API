import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
export declare class UsuarioService {
    private readonly repo;
    constructor(repo: Repository<Usuario>);
    create(dto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    update(id: number, dto: Partial<CreateUsuarioDto>): Promise<Usuario>;
    remove(id: number): Promise<void>;
}
