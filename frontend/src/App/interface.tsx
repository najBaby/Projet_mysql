export interface StateNavBar {
    show: boolean
    me: string
}

export interface StateConnexion {
    hide: boolean
}

import { Length, IsEmail } from 'class-validator'

export class Utilisateur {
    @Length(3, 15, {
        message: 'nom incorrêt'
    })
    nom?: string

    @Length(3, 15, {
        message: 'prenom incorrêt'
    })
    prenom?: string

    @Length(3, 15, {
        message: 'Mot de passe: Entrez au moins 8 chiffres ou lettres'
    })
    passord?: string

    @IsEmail({}, {
        message: 'nom incorrêt'
    })
    email?: string
}