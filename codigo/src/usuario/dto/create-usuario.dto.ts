import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';
import { UserRole } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  @IsEmail()
  @ApiProperty({ example: 'joao@example.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'senhaSegura123' })
  password: string;

  @IsIn(['consumidor','entregador','loja'])
  @ApiProperty({ example: 'consumidor', enum: ['consumidor','entregador','loja'] })
  role: UserRole;
}
