import { Request, Response } from 'express'
import Organisation from '../../../entity/organisation'
import { Enregistrer } from '../../../tools/tools/enregistrer'
import { TrouverUn } from '../../../tools/tools/trouverUn'

export async function inscrireOrganisation(req: Request, res: Response) {
  const organisation = new Organisation()
  Object.assign(organisation, req.body)

  const verify = new Organisation()
  Object.assign(verify, { email: organisation.email })
  new TrouverUn(verify).trouve().then(e => {
    if (e)
      res.status(200).send({ message: "Cet email existe déja" })
    else
      new Enregistrer(organisation).enregistre().then(e => {
        if (e)
          res.status(200).send({ success: "Votre inscription a reussi." })
        else
          res.status(200).send({ message: "Une erreure est survenue lors de l'inscription. Veillez réessayer plutard" })
      })
  })

}
