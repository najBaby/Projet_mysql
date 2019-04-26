import { PrimaryGeneratedColumn, Column, Entity, OneToOne, ManyToMany, JoinTable, ManyToOne } from 'typeorm'
import Categorie from './categorie'
import Utilisateur from './utilisateur'
import Commentaire from './commentaire'

@Entity()
export default class Projet {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: true })
  nom?: string

  @Column({ nullable: true })
  photo?: string


  @ManyToOne(() => Commentaire, commentaire => commentaire.projets)
  commentaires: Commentaire[]

  @OneToOne(() => Categorie, categorie => categorie.projet)
  categorie?: Categorie

  @ManyToMany(() => Utilisateur, utilisateurs => utilisateurs.projets, {
    cascade: true
  })
  @JoinTable()
  utilisateurs!: Utilisateur[]
}
