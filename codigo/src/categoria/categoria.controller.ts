import { Controller, Post, Body, Get, Param, Patch, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CategoriaResponseDto } from './dto/categoria-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';


@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'loja')
  async create(@Body() dto: CreateCategoriaDto): Promise<CategoriaResponseDto> {
    const categoria = await this.categoriaService.create(dto);
    return {
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'loja')
  async findAll(): Promise<CategoriaResponseDto[]> {
    const categorias = await this.categoriaService.findAll();
    return categorias.map((categoria) => ({
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
    }));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'loja')
  async findOne(@Param('id') id: number): Promise<CategoriaResponseDto> {
    const categoria = await this.categoriaService.findOne(id);
    return {
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'loja')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateCategoriaDto,
  ): Promise<CategoriaResponseDto> {
    const categoria = await this.categoriaService.update(id, dto);
    return {
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'loja')
  async remove(@Param('id') id: number): Promise<void> {
    await this.categoriaService.remove(id);
  }
}