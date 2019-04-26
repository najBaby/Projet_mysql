import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToMany, OneToOne } from 'typeorm'
import Utilisateur from './utilisateur'
import Challenge from './challenge'
import Lieu from './lieu'

@Entity()
export default class Organisation {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: true })
  nom?: string

  @Column({ nullable: true })
  email?: string

  @Column({ nullable: true })
  password?: string

  @OneToOne(() => Lieu, lieu => lieu.organisation)
  lieu?: Lieu

  @OneToMany(() => Utilisateur, utilisateur => utilisateur.organisation)
  utilisateurs?: Utilisateur[]

  @ManyToMany(() => Challenge, challenge => challenge.organisations)
  challenge?: Challenge[]
}
