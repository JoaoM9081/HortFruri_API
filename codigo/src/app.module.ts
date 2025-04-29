import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumidorModule } from './consumidor/consumidor.module';
import { EntregadorModule } from './entregador/entregador.module';
import { LojaModule } from './loja/loja.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { EnderecoModule } from './endereco/endereco.module';
import { EstoqueModule } from './estoque/estoque.module';
import { PedidoModule } from './pedido/pedido.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    
     ConsumidorModule, EntregadorModule, LojaModule, CategoriaModule, ProdutoModule, EnderecoModule, EstoqueModule, PedidoModule,  PagamentoModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}