import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CategoriaResponseDto } from './dto/categoria-response.dto';
export declare class CategoriaController {
    private readonly categoriaService;
    constructor(categoriaService: CategoriaService);
    create(dto: CreateCategoriaDto): Promise<CategoriaResponseDto>;
    findAll(): Promise<CategoriaResponseDto[]>;
    findOne(id: number): Promise<CategoriaResponseDto>;
    update(id: number, dto: Partial<CreateCategoriaDto>): Promise<CategoriaResponseDto>;
    remove(id: number): Promise<void>;
}
