import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from 'typeorm'
import Projet from './projet'

@Entity()
export default class Categorie {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: true })
  nom?: string

  @Column({ nullable: true })
  prenom?: string

  @Column({ nullable: true })
  email?: string

  @OneToOne(() => Projet, projet => projet.categorie)
  projet?: Projet
}
