import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, Min } from 'class-validator';

export enum FormaPagamento {
  PIX = 'PIX',
  CARTAO = 'CARTAO',
  DINHEIRO = 'DINHEIRO',
}

export enum StatusPagamento {
  PENDENTE = 'PENDENTE',
  CONCLUIDO = 'CONCLUIDO',
  FALHOU = 'FALHOU',
}

export class CreatePagamentoDto {

  @IsEnum(FormaPagamento)
  @ApiProperty()
  formaPagamento: FormaPagamento;

  @IsNumber()
  @Min(0)
  valorPago: number;
}