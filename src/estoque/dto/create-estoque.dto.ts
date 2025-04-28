import { IsInt, Min } from 'class-validator';

export class CreateEstoqueDto {

  @IsInt()
  @Min(0)
  quantidadeDisponivel: number;
}