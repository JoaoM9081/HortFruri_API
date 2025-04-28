import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { Estoque } from './entities/estoque.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Estoque])],
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}
