import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { Produto } from './entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from 'src/loja/entities/loja.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Estoque } from 'src/estoque/entities/estoque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Loja, Categoria, Estoque])],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [ProdutoService], 
})
export class ProdutoModule {}