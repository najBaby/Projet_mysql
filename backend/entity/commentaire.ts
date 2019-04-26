import { PrimaryGeneratedColumn, Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import Projet from './projet'
import Utilisateur from './utilisateur'

@Entity()
export default class Commentaire {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: true })
  contenu?: string

  @OneToMany(() => Projet, projet => projet.commentaires, {
    cascade: true
  })
  projets?: Projet

  @OneToOne(() => Utilisateur, utilisateur => utilisateur.commentaire, {
    cascade: true
  })
  @JoinColumn()
  utilisateur?: Utilisateur
}
