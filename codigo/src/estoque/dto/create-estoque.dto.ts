import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateEstoqueDto {

  @IsInt()
  @Min(0)
  @ApiProperty()
  quantidadeDisponivel: number;
}