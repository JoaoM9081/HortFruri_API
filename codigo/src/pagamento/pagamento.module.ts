import { forwardRef, Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { Pagamento } from './entities/pagamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pagamento, Pedido]), 
  ],
  providers: [PagamentoService],
  exports: [PagamentoService],
})
export class PagamentoModule {}