import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'consumidor' | 'entregador' | 'loja' | 'admin';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}