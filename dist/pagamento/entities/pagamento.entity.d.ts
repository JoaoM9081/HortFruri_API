import { Pedido } from 'src/pedido/entities/pedido.entity';
export declare class Pagamento {
    id: number;
    pedido: Pedido;
    formaPagamento: 'PIX' | 'CARTAO' | 'DINHEIRO';
    status: 'PENDENTE' | 'CONCLUIDO' | 'FALHOU';
    valorPago: number;
    dataPagamento: Date;
}
