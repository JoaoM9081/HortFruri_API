import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class EstoqueDecrementarDto {

  @IsInt()
  @Min(0)
  @ApiProperty({
    example: 20,  
    description: 'Quantidade a ser decrementada do produto no estoque',
  })
  quantidade: number;
}