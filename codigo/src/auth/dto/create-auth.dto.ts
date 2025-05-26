// src/auth/dto/create-auth.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'joao@exemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaForte#123' })
  @IsString()
  password: string;
}
