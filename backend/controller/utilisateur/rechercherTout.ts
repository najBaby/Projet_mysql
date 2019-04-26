import { Request, Response } from 'express'
import { Trouver } from '../../tools/tools/trouver'
import Utilisateur from '../../entity/utilisateur'


export async function rechercherToutUtilisateur(req: Request, res: Response) {
    const utilisateur = new Utilisateur()
    Object.assign(utilisateur, req.body)

    new Trouver(utilisateur).trouve().then(e => {
        if (e)
            res.status(200).send({ success: e })
        else
            res.status(400).send({ message: "Oops, il n'y a pas encore d'ecoles ou organisations." })
    })
}