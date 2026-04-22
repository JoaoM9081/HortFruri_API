import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ConsumidorModule } from './consumidor/consumidor.module';
import { buildTypeOrmOptions } from './database/database.config';
import { EnderecoModule } from './endereco/endereco.module';
import { EntregadorModule } from './entregador/entregador.module';
import { EstoqueModule } from './estoque/estoque.module';
import { LojaModule } from './loja/loja.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { PedidoModule } from './pedido/pedido.module';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        buildTypeOrmOptions(configService),
    }),
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
    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}
