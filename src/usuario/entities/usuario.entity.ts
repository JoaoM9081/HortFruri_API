import { Consumidor } from "src/consumidor/entities/consumidor.entity";
import { Entregador } from "src/entregador/entities/entregador.entity";
import { Loja } from "src/loja/entities/loja.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    senha: string;
  
    @Column({ type: 'enum', enum: ['CONSUMIDOR', 'ENTREGADOR', 'LOJA'] })
    papel: 'CONSUMIDOR' | 'ENTREGADOR' | 'LOJA';
  
    @CreateDateColumn()
    criadoEm: Date;
  
    @UpdateDateColumn()
    atualizadoEm: Date;
  
    @OneToOne(() => Consumidor, consumidor => consumidor.usuario)
    consumidor: Consumidor;
  
    @OneToOne(() => Entregador, entregador => entregador.usuario)
    entregador: Entregador;
  
    @OneToOne(() => Loja, loja => loja.usuario)
    loja: Loja;
  }