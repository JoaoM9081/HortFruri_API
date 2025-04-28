import { Module } from '@nestjs/common';
import { ConsumidorService } from './consumidor.service';
import { ConsumidorController } from './consumidor.controller';

@Module({
  controllers: [ConsumidorController],
  providers: [ConsumidorService],
})
export class ConsumidorModule {}
