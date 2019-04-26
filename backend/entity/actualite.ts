import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm'

@Entity()
export default class Actualite {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: true })
  titre?: string

  @Column('text', { nullable: true })
  contenu?: string
}
