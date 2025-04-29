import { Module } from '@nestjs/common';
import { EntregadorService } from './entregador.service';
import { EntregadorController } from './entregador.controller';
import { Entregador } from './entities/entregador.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Entregador])],
  controllers: [EntregadorController],
  providers: [EntregadorService],
})
export class EntregadorModule {}
