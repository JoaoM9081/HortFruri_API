import { Module } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';
import { Endereco } from './entities/endereco.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Endereco])],
  controllers: [EnderecoController],
  providers: [EnderecoService],
})
export class EnderecoModule {}
