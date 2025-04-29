import { Pedido } from "src/pedido/entities/pedido.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Entregador {
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

  @Column()
  veiculo: string;

  @Column()
  placa: string;

  @OneToMany(() => Pedido, pedido => pedido.entregador, { onDelete: 'SET NULL' })
  pedidos: Pedido[];
}