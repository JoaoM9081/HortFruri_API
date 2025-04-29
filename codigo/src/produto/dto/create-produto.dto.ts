import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  preco: number;
}