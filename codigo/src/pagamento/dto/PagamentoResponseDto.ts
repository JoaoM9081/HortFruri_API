import { FormaPagamento, StatusPagamento } from './create-pagamento.dto';
import { PedidoResponseDto } from 'src/pedido/dto/pedidoResponseDto';

export class PagamentoResponseDto {
  pagamentoId: number;
  formaPagamento: FormaPagamento;
  statusPagamento: StatusPagamento;
  pedido: PedidoResponseDto;
}
