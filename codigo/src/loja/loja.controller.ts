import { Controller, Post, Body, Get, Param, Patch, Delete, Put, ParseIntPipe, UseGuards, UseInterceptors, BadRequestException, HttpCode, HttpStatus, UploadedFile } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { LojaResponseDto } from './dto/LojaResponseDto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { extname } from 'path';

@Controller('lojas')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post()
  async create(
    @Body() dto: CreateLojaDto,
  ): Promise<LojaResponseDto> {
    const loja = await this.lojaService.create(dto);
    return this.toResponse(loja);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll(): Promise<LojaResponseDto[]> {
    const lojas = await this.lojaService.findAll();
    return lojas.map(l => this.toResponse(l));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'loja')	
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LojaResponseDto> {
    const loja = await this.lojaService.findOne(id);
    return this.toResponse(loja);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'loja')	
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateLojaDto,
  ): Promise<LojaResponseDto> {
    const loja = await this.lojaService.update(id, dto);
    return this.toResponse(loja);
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
  
      await this.lojaService.atualizarImagem(id, imagemUrl);
  
      return { mensagem: `Imagem da loja ${id} atualizada com sucesso.` };
    }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'loja')	
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.lojaService.remove(id);
  }

  private toResponse(loja: any): LojaResponseDto {
    return {
      id: loja.id,
      nome: loja.nome,
      cnpj: loja.cnpj,
      telefone: loja.telefone,
      email: loja.email,
      endereco: {
        id:        loja.endereco.id,
        rua:       loja.endereco.rua,
        numero:    loja.endereco.numero,
        complemento: loja.endereco.complemento,
        cidade:    loja.endereco.cidade,
        cep:       loja.endereco.cep,
      },
      imagemUrl: loja.imagemUrl,
    };
  }

  @Get('email/:email')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'loja')
  async findByEmail(
    @Param('email') email: string,
  ): Promise<LojaResponseDto> {
    const loja = await this.lojaService.findByEmail(email);
    return this.toResponse(loja);
  }
}