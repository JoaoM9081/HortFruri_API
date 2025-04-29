import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @ApiProperty({
    example: 'Maçã Gala',  // Exemplo de nome do produto
    description: 'Nome do produto, como por exemplo uma variedade de fruta, legumes, etc.',
  })
  nome: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 5.50,  // Exemplo de preço do produto
    description: 'Preço do produto, em formato numérico. O preço deve ser maior ou igual a 0.',
  })
  preco: number;
}