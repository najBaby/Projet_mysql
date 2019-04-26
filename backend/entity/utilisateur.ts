import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToOne, ManyToMany } from 'typeorm'
import Organisation from './organisation'
import Lieu from './lieu'
import Projet from './projet'
import Commentaire from './commentaire'

@Entity()
export default class Utilisateur {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: true })
  nom?: string

  @Column({ nullable: true })
  photo?: string

  @Column({ nullable: true })
  profession?: string

  @Column({ nullable: true })
  email?: string

  @Column({ nullable: true })
  password?: string

  @OneToOne(() => Commentaire, commentaire => commentaire.utilisateur)
  commentaire?: string

  @OneToOne(() => Lieu, lieu => lieu.utilisateur)
  lieu?: Lieu

  @ManyToOne(() => Organisation, organisation => organisation.utilisateurs)
  organisation?: Organisation

  @ManyToMany(() => Projet, projet => projet.utilisateurs)
  projets!: Projet[]
}
