import { Module } from '@nestjs/common';
import { EntregadorService } from './entregador.service';
import { EntregadorController } from './entregador.controller';

@Module({
  controllers: [EntregadorController],
  providers: [EntregadorService],
})
export class EntregadorModule {}
