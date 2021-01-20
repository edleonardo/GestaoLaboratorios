import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import TipoExame from './TipoExame'
import Associacao from './Associacao'

@Entity('Exames')
export default class Exame {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  ativo: boolean

  @ManyToOne(() => TipoExame, tipo => tipo.nome)
  @JoinColumn({ name: 'tipoExame_id' })
  tipo: TipoExame

  @OneToMany(() => Associacao, associacao => associacao.exame)
  @JoinColumn({ name: 'exame_id' })
  associacao: Associacao
}