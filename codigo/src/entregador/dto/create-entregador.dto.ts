import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber } from 'class-validator';

export class CreateEntregadorDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsPhoneNumber('BR')
  @ApiProperty()
  telefone: string;

  @IsString()
  @ApiProperty()
  veiculo: string;

  @IsString()
  @ApiProperty()
  placa: string;
}