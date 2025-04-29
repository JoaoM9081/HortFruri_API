import { Module } from '@nestjs/common';
import { ConsumidorService } from './consumidor.service';
import { ConsumidorController } from './consumidor.controller';
import { Consumidor } from './entities/consumidor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Consumidor])],
  controllers: [ConsumidorController],
  providers: [ConsumidorService],
})
export class ConsumidorModule {}
