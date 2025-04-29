import { forwardRef, Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { Pedido } from './entities/pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPedido } from 'src/itemPedido/entities/itemPedido.entity';
import { ProdutoModule } from 'src/produto/produto.module';
import { EstoqueModule } from 'src/estoque/estoque.module';
import { PagamentoModule } from 'src/pagamento/pagamento.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, ItemPedido]),
    ProdutoModule,
    PagamentoModule,
    EstoqueModule,
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}
