import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { Estoque } from './entities/estoque.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from 'src/produto/produto.service';
import { LojaService } from 'src/loja/loja.service';

@Module({
  imports: [TypeOrmModule.forFeature([Estoque])],
  controllers: [EstoqueController],
  providers: [EstoqueService, ProdutoService, LojaService],
})
export class EstoqueModule {}
