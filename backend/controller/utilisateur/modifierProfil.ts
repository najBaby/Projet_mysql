import { Request, Response } from 'express'
import { Modifier } from '../../tools/tools/modifier'
import Utilisateur from '../../entity/utilisateur';


export async function modifierProfil(req: Request, res: Response) {
    if (req.file) {
        console.log(req.file)
        console.log((<any>req).decoded)
        if ((<any>req).decoded) {
            let utilisateur = new Utilisateur()
            utilisateur.id = (<any>req).decoded.id
            utilisateur.photo = req.file.filename
            new Modifier(utilisateur).modifie().then(e => {
                if (e)
                    res.send({ success: true })
            })
        } else {
            res.send("Erreur 2")
        }
    } else {
        res.send("Erreur 1")
    }
}