import { Module } from '@nestjs/common';
import { ConsumidorService } from './consumidor.service';
import { ConsumidorController } from './consumidor.controller';
import { Consumidor } from './entities/consumidor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Consumidor]),
  UsuarioModule
],
  controllers: [ConsumidorController],
  providers: [ConsumidorService],
})
export class ConsumidorModule {}
