import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { Pagamento } from './entities/pagamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueService } from 'src/estoque/estoque.service';
import { ProdutoService } from 'src/produto/produto.service';
import { LojaService } from 'src/loja/loja.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento])],
  controllers: [PagamentoController],
  providers: [EstoqueService, ProdutoService, LojaService], 
})
export class PagamentoModule {}
