import { forwardRef, Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { Pedido } from './entities/pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPedido } from 'src/itemPedido/entities/itemPedido.entity';
import { ProdutoModule } from 'src/produto/produto.module';
import { EstoqueModule } from 'src/estoque/estoque.module';
import { PagamentoModule } from 'src/pagamento/pagamento.module';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Consumidor } from 'src/consumidor/entities/consumidor.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { Entregador } from 'src/entregador/entities/entregador.entity';
import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, ItemPedido, Endereco, Consumidor, Loja, Entregador]),
    ProdutoModule,
    PagamentoModule,
    EstoqueModule,
    Avaliacao
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}
