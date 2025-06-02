import { Controller, Post, Body, Get, Param, Patch, Delete, Query, Put, ParseIntPipe, UseGuards, UseInterceptors, BadRequestException, HttpCode, HttpStatus, UploadedFile } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ProdutoCatalogoDto } from './dto/produtoCatalogoDto';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';

@Controller('produtos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'loja')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post(':lojaId/:categoriaId')
  async create(
    @Param('lojaId', ParseIntPipe) lojaId: number,
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
    @Body() dto: CreateProdutoDto,
  ): Promise<ProdutoCatalogoDto> {
    const produto = await this.produtoService.create(lojaId, categoriaId, dto);
    const quantidadeDisponivel = produto.estoques
      .reduce((total, e) => total + e.quantidadeDisponivel, 0);

    return {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria.nome,
      quantidadeDisponivel,
    };
  }

  @Get()
  async findAll(): Promise<ProdutoCatalogoDto[]> {
    const produtos = await this.produtoService.findAll();
    return produtos.map(produto => ({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria.nome,
      quantidadeDisponivel: produto.estoques.reduce((total, estoque) => total + estoque.quantidadeDisponivel, 0),
      imagemUrl: produto.imagemUrl,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProdutoCatalogoDto> {
    const produto = await this.produtoService.findOne(id);
    return {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria.nome,
      quantidadeDisponivel: produto.estoques.reduce((total, estoque) => total + estoque.quantidadeDisponivel, 0),
      imagemUrl: produto.imagemUrl,
    };
  }

  @Patch(':id/imagem')
  @UseInterceptors(
    FileInterceptor('imagem', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExt = extname(file.originalname);
          const timestamp = Date.now();
          cb(null, `${name}-${timestamp}${fileExt}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new BadRequestException('Apenas imagens JPG/PNG são permitidas'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Imagem enviada com sucesso.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imagem: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo JPG/PNG a ser enviado.',
        },
      },
      required: ['imagem'],
    },
  })
  @HttpCode(HttpStatus.OK)
  async uploadImagem(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() imagem: Express.Multer.File,
  ): Promise<{ mensagem: string }> {
    if (!imagem) {
      throw new BadRequestException('É necessário enviar um arquivo de imagem.');
    }

    const imagemUrl = `/uploads/${imagem.filename}`;

    await this.produtoService.atualizarImagem(id, imagemUrl);

    return { mensagem: `Imagem do produto ${id} atualizada com sucesso.` };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProdutoDto: CreateProdutoDto,
  ): Promise<ProdutoCatalogoDto> {
    const produto = await this.produtoService.update(id, updateProdutoDto);
    return {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria.nome,
      quantidadeDisponivel: produto.estoques.reduce((total, estoque) => total + estoque.quantidadeDisponivel, 0),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.produtoService.remove(id);
  }
}