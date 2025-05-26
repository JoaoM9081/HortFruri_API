import { Module }        from '@nestjs/common';
import { ConfigModule }  from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumidorModule }  from './consumidor/consumidor.module';
import { EntregadorModule }  from './entregador/entregador.module';
import { LojaModule }        from './loja/loja.module';
import { CategoriaModule }   from './categoria/categoria.module';
import { ProdutoModule }     from './produto/produto.module';
import { EnderecoModule }    from './endereco/endereco.module';
import { EstoqueModule }     from './estoque/estoque.module';
import { PedidoModule }      from './pedido/pedido.module';
import { PagamentoModule }   from './pagamento/pagamento.module';
import { AvaliacaoModule }   from './avaliacao/avaliacao.module';

import { UsuarioModule }     from './usuario/usuario.module';
import { AuthModule }        from './auth/auth.module';

@Module({
  imports: [
    // 1) Configuração global (.env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // 2) TypeORM
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // 3) Domínio
    ConsumidorModule,
    EntregadorModule,
    LojaModule,
    CategoriaModule,
    ProdutoModule,
    EnderecoModule,
    EstoqueModule,
    PedidoModule,
    PagamentoModule,
    AvaliacaoModule,
    // 4) Usuário & Auth
    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}