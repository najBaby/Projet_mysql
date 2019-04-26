import { Request, Response } from 'express'
import { Trouver } from '../../tools/tools/trouver'
import Organisation from '../../entity/organisation'


export async function rechercherTout(req: Request, res: Response) {
  const organisation = new Organisation()
  Object.assign(organisation, req.body)

  new Trouver(organisation).trouve().then(e => {
    if (e)
      res.status(200).send({ success: e })
    else
      res.status(400).send({ message: "Oops, il n'y a pas encore d'ecoles ou organisations." })
  })
}
