import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  descricao?: string;
}