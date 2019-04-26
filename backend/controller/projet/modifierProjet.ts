import { Request, Response } from 'express'
import Utilisateur from '../../entity/utilisateur';
import { getRepository } from 'typeorm';
import { Enregistrer } from '../../../scc/tools/dto/enregistrer';


export async function modifierProjet(req: Request, res: Response) {
    console.log((<any>req).decoded)
    if ((<any>req).decoded) {
        let utilisateur = await getRepository(Utilisateur).findOne((<any>req).decoded.id, { relations: ['projets'] })
        if (utilisateur) {
            console.log(req.body)
            utilisateur.projets[0] = req.body
            new Enregistrer(utilisateur).enregistre().then(e => {
                if (e)
                    res.send({ success: true })
            })
        }
    } else {
        res.send("Erreur 2")
    }
}