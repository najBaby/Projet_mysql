import { Request, Response } from 'express'
import { Enregistrer } from '../../tools/tools/enregistrer'
import Projet from '../../entity/projet'
import Utilisateur from '../../entity/utilisateur';


export async function creerProjet(req: Request, res: Response) {
    if (req.file) {
        console.log(req.file)
        if ((<any>req).decoded) {
            let utilisateur = new Utilisateur()
            utilisateur.id = (<any>req).decoded.id
            let projet = new Projet()
            Object.assign(projet, req.body)
            projet.photo = req.file.filename;
            projet.utilisateurs = [utilisateur]
            new Enregistrer(projet).enregistre().then(e => {
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