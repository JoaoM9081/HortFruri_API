import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvaliacaoService }    from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { Avaliacao }           from './entities/avaliacao.entity';
import { Pedido }              from 'src/pedido/entities/pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avaliacao, Pedido]),
  ],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService],
})
export class AvaliacaoModule {}