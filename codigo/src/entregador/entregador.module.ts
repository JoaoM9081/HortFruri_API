import { Module } from '@nestjs/common';
import { EntregadorService } from './entregador.service';
import { EntregadorController } from './entregador.controller';
import { Entregador } from './entities/entregador.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoModule } from 'src/pedido/pedido.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entregador]),
  PedidoModule,
  UsuarioModule
],
  controllers: [EntregadorController],
  providers: [EntregadorService],
})
export class EntregadorModule {}
