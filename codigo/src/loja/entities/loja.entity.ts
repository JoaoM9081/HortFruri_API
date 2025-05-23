import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Estoque } from 'src/estoque/entities/estoque.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Loja {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nome: string;
  
    @Column({ unique: true })
    cnpj: string;
  
    @Column()
    telefone: string;
  
    @Column({ unique: true })
    email: string;  

    @Column()
    senha: string;  
  
    @ManyToOne(() => Endereco, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'enderecoId' })
    endereco: Endereco;
  
    @OneToMany(() => Produto, produto => produto.loja, { cascade: true })
    produtos: Produto[];
  
    @OneToMany(() => Estoque, estoque => estoque.loja, { cascade: true })
    estoques: Estoque[];
  
    @OneToMany(() => Pedido, pedido => pedido.loja, { onDelete: 'CASCADE' })
    pedidos: Pedido[];
  } 