import { Request, Response } from 'express'
import { Trouver } from '../../tools/tools/trouver'
import Projet from '../../entity/projet'


export async function rechercherTout(_req: Request, res: Response) {
    const projet = new Projet()
    Object.assign(projet, { relations: ['utilisateurs'] })
    console.log(projet)

    new Trouver(projet).trouve().then(e => {
        if (e)
            res.status(200).send({ success: e })
        else
            res.status(400).send({ message: "Oops, il n'y a pas encore d'ecoles ou organisations." })
    })
}