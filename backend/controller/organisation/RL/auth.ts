import { Request, Response } from 'express'
import Organisation from '../../../entity/organisation'
import { TrouverUn } from '../../../tools/tools/trouverUn'

export async function auth(req: Request, res: Response) {
  const organisation = new Organisation()
  Object.assign(organisation, req.body)

  new TrouverUn(organisation).trouve().then(e => {
    if (e)
      res.status(200).send({ success: e })
    else
      res.status(200).send({ message: "Incorrect email ou mot de passe" })
  })
}
