import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProdutoNomeDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do produto para consulta do estoque',
    example: 'Banana',
  })
  produtoNome: string;
}