import { Consumidor } from 'src/consumidor/entities/consumidor.entity';
import { Entregador } from 'src/entregador/entities/entregador.entity';
import { ItemPedido } from 'src/itemPedido/entities/itemPedido.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { StatusPedido } from '../dto/StatusPedido';
export declare class Pedido {
    id: number;
    status: StatusPedido;
    consumidor: Consumidor;
    loja: Loja;
    entregador: Entregador;
    itens: ItemPedido[];
    pagamentos: Pagamento[];
    total: number;
    dataCriacao: Date;
}
