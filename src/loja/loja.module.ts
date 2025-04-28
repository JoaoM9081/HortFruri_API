import { Module } from '@nestjs/common';
import { LojaService } from './loja.service';
import { LojaController } from './loja.controller';
import { Loja } from './entities/loja.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Loja])],
  controllers: [LojaController],
  providers: [LojaService],
})
export class LojaModule {}
