import { Request, Response } from 'express'
import Utilisateur from '../../../entity/utilisateur'
import { Enregistrer } from '../../../tools/tools/enregistrer'
import { TrouverUn } from '../../../tools/tools/trouverUn'

export async function inscrireUtilisateur(req: Request, res: Response) {
  const utilisateur = new Utilisateur()
  Object.assign(utilisateur, req.body)

  const verify = new Utilisateur()
  Object.assign(verify, { email: utilisateur.email })

  new TrouverUn(verify).trouve().then(e => {
    if (e)
      res.status(200).send({ message: "Cet email existe déja." })
    else
      new Enregistrer(utilisateur).enregistre().then(e => {
        if (e)
          res.status(200).send({ success: "Votre inscription a reussi." })
        else
          res.status(200).send({ message: "Une erreure est survenue lors de l'inscription. Veillez réessayer plutard" })
      })
  })


}
