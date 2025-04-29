import { forwardRef, Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { Pagamento } from './entities/pagamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { EstoqueModule } from 'src/estoque/estoque.module';
import { PagamentoController } from './pagamento.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pagamento, Pedido]),
    EstoqueModule,
  ],
  providers: [PagamentoService],
  controllers: [PagamentoController],
  exports: [PagamentoService],
})
export class PagamentoModule {}