import { Request, Response } from 'express'
import { inscrireUtilisateur } from './controller/utilisateur/RL/inscrire'
import { inscrireOrganisation } from './controller/organisation/RL/inscrire'
import { rechercherTout } from './controller/projet/rechercherTout'
import { auth } from './controller/utilisateur/RL/auth'
import { parseCookie, deleteToken } from './tools/token'
import { modifierUtilisateur } from './controller/utilisateur/modifier'
import { rechercherToutUtilisateur } from './controller/utilisateur/rechercherTout'
import { creerProjet } from './controller/projet/creerProjets'
import { modifierProfil } from './controller/utilisateur/modifierProfil'
import { modifierProjet } from './controller/projet/modifierProjet'


export const routes: Routes[] = [
  {
    path: "/inscrire/utilisateur",
    method: "post",
    action: inscrireUtilisateur
  },
  {
    path: "/modifier/utilisateur",
    method: "post",
    action: modifierUtilisateur
  },
  {
    path: "/inscrire/ecole_organisation",
    method: "post",
    action: inscrireOrganisation
  },
  {
    path: "/ecole_organisation",
    method: "post",
    action: rechercherTout
  },
  {
    path: "/login/utilisateur",
    method: "post",
    action: auth
  },
  {
    path: "/active",
    method: "get",
    action: parseCookie
  },
  {
    path: "/rechercherTout",
    method: "get",
    action: rechercherTout
  },
  {
    path: "/rechercherToutUtilisateur",
    method: "get",
    action: rechercherToutUtilisateur
  },
  {
    path: "/logout",
    method: "get",
    action: deleteToken
  },
  {
    path: "/creerProjet",
    method: "post",
    action: creerProjet
  },
  {
    path: "/modifierProjet",
    method: "post",
    action: modifierProjet
  },
  {
    path: "/modifierProfil",
    method: "post",
    action: modifierProfil
  }
]


type Controller = (req: Request, res: Response) => Promise<void>

export interface Routes {
  path: string,
  method: string
  action: Controller
}
