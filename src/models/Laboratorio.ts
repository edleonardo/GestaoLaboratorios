import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm'
import Associacao from './Associacao'

@Entity('Laboratorios')
export default class Laboratorio {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  ativo: boolean;

  @OneToMany(() => Associacao, associacao => associacao.laboratorio)
  @JoinColumn({ name: 'laboratorio_id' })
  associacao: Associacao;
}