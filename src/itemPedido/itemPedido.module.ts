import { Module } from '@nestjs/common';
import { ItemPedidoService } from './itemPedido.service';
import { ItemPedidoController } from './itemPedido.controller';
import { ItemPedido } from './entities/itemPedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ItemPedido])],
  controllers: [ItemPedidoController],
  providers: [ItemPedidoService],
})
export class ItemPedidoModule {}
