import { IsEnum } from 'class-validator';
import { FormaPagamento } from './create-pagamento.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FormaPagamentoDto {
  @IsEnum(FormaPagamento)
  @ApiProperty({
    example: "PIX, CARTAO ou DINHEIRO", 
  })
  formaPagamento: FormaPagamento;  
}