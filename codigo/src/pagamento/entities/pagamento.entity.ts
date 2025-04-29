import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { FormaPagamento, StatusPagamento } from '../dto/create-pagamento.dto';

@Entity()
export class Pagamento {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Pedido, pedido => pedido.pagamentos, { onDelete: 'CASCADE' , eager: true })
    @JoinColumn({ name: 'pedidoId' })
    pedido: Pedido;
  
    @Column({ type: 'text' })
    formaPagamento: FormaPagamento;
  
    @Column({ type: 'text' })
    status: StatusPagamento;
  
    @Column('decimal', { precision: 10, scale: 2 })
    valorPago: number;
  
    @CreateDateColumn()
    dataPagamento: Date;
  }