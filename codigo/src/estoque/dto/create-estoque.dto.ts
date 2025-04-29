import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateEstoqueDto {

  @IsInt()
  @Min(0)
  @ApiProperty({
    example: 100,  
    description: 'Quantidade disponível do produto no estoque',
  })
  quantidadeDisponivel: number;
}