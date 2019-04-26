import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable } from 'typeorm'
import Organisation from './organisation'

@Entity()
export default class Challenge {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: true })
  nom?: string

  @ManyToMany(() => Organisation, organisation => organisation.challenge, {
    cascade: true
  })
  @JoinTable()
  organisations?: Organisation[]
}
