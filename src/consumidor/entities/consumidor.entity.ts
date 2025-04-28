import { Pedido } from "src/pedido/entities/pedido.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Consumidor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @OneToOne(() => Usuario, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @OneToMany(() => Pedido, pedido => pedido.consumidor, { onDelete: 'CASCADE' })
  pedidos: Pedido[];
}