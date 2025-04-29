import { Pedido } from "src/pedido/entities/pedido.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Consumidor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @OneToMany(() => Pedido, pedido => pedido.consumidor, { onDelete: 'CASCADE' })
  pedidos: Pedido[];
}