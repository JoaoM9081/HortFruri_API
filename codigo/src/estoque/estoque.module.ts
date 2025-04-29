import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { Estoque } from './entities/estoque.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LojaService } from 'src/loja/loja.service';
import { ProdutoModule } from 'src/produto/produto.module';
import { LojaModule } from 'src/loja/loja.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estoque]),
    ProdutoModule, 
    LojaModule,
  ],
  providers: [EstoqueService, LojaService],
  controllers: [EstoqueController],
  exports: [EstoqueService],
})
export class EstoqueModule {}