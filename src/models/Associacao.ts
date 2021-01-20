import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne } from 'typeorm'
import Exame from './Exame'
import Laboratorio from './Laboratorio'

@Entity('Associacao')
export default class Associacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Exame, exame => exame.id)
  @JoinColumn({ name: 'exame_id' })
  exame: Exame;

  @ManyToOne(() => Laboratorio, laboratorio => laboratorio.id)
  @JoinColumn({ name: 'laboratorio_id' })
  laboratorio: Laboratorio;
}