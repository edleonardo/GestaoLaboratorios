import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Exame from './Exame'

@Entity('TipoExame')
export default class TipoExame {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Exame, exame => exame.tipo)
  @JoinColumn({ name: 'tipoExame_id' })
  exame: Exame
}