import { Request, Response } from 'express'
import Utilisateur from '../../../entity/utilisateur'
import { TrouverUn } from '../../../tools/tools/trouverUn'
import { createToken } from '../../../tools/token'

export async function auth(req: Request, res: Response) {
  const utilisateur = new Utilisateur()
  Object.assign(utilisateur, req.body)

  new TrouverUn(utilisateur).trouve().then(async e => {
    if (e)
      await res.status(200).cookie("Token", await createToken(e)).send({ success: e })
    else
      res.status(200).send({ message: "email ou mot de passe incorrect" })
  })
}
