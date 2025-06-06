import { IsEnum, IsNumber, Min } from 'class-validator';

export enum FormaPagamento {
  PIX = 'PIX',
  CARTAO = 'CARTAO',
  DINHEIRO = 'DINHEIRO',
}

export enum StatusPagamento {
  PENDENTE = 'PENDENTE',
  CONCLUIDO = 'CONCLUIDO',
}

export class CreatePagamentoDto {
  @IsEnum(FormaPagamento)
  formaPagamento: FormaPagamento;

  @IsNumber()
  @Min(0)
  valorPago: number;

  @IsEnum(StatusPagamento)
  status: StatusPagamento;
}