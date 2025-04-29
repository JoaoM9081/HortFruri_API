import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsPostalCode } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  @ApiProperty()
  rua: string;

  @IsString()
  @ApiProperty()
  numero: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  complemento?: string;

  @IsString()
  @ApiProperty()
  cidade: string;

  @IsPostalCode('BR')
  @ApiProperty()
  cep: string;
}