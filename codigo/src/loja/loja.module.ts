import { Module } from '@nestjs/common';
import { LojaService } from './loja.service';
import { LojaController } from './loja.controller';
import { Loja } from './entities/loja.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loja, Endereco]), 
    UsuarioModule,
  ],
  providers: [LojaService],
  controllers: [LojaController],
  exports: [
    LojaService, 
    TypeOrmModule, 
  ],
})
export class LojaModule {}