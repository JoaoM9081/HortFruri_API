import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @ApiProperty({
    example: 'Frutas',  // Exemplo de nome de categoria para hortifruti
    description: 'Nome da categoria de produtos no setor de hortifruti, como frutas, legumes, etc.',
  })
  nome: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Categoria para frutas frescas como maçãs, bananas, etc.',  // Exemplo de descrição
    description: 'Descrição opcional da categoria, detalhando o tipo de produtos que pertencem a esta categoria.',
  })
  descricao?: string;
}
