import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CategoriaResponseDto } from './dto/categoria-response.dto';


@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() dto: CreateCategoriaDto): Promise<CategoriaResponseDto> {
    const categoria = await this.categoriaService.create(dto);
    return {
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
    };
  }

  @Get()
  async findAll(): Promise<CategoriaResponseDto[]> {
    const categorias = await this.categoriaService.findAll();
    return categorias.map((categoria) => ({
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CategoriaResponseDto> {
    const categoria = await this.categoriaService.findOne(id);
    return {
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: Partial<CreateCategoriaDto>,
  ): Promise<CategoriaResponseDto> {
    const categoria = await this.categoriaService.update(id, dto);
    return {
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.categoriaService.remove(id);
  }
}