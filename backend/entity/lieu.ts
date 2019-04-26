import { PrimaryGeneratedColumn, Entity, Column, OneToOne, JoinColumn } from 'typeorm'
import Organisation from './organisation'
import Utilisateur from './utilisateur'

@Entity()
export default class Lieu {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: true })
  continent?: string

  @Column({ nullable: true })
  pays?: string

  @Column({ nullable: true })
  ville?: string

  @OneToOne(() => Utilisateur, utilisateur => utilisateur.lieu, {
    cascade: true
  })
  @JoinColumn()
  utilisateur?: Utilisateur

  @OneToOne(() => Organisation, organisation => organisation.lieu, {
    cascade: true
  })
  @JoinColumn()
  organisation?: Organisation
}
