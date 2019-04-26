import { Request, Response } from 'express'
import Utilisateur from '../../entity/utilisateur'
import { Modifier } from '../../tools/tools/modifier'

export async function modifierUtilisateur(req: Request, res: Response) {
    const utilisateur = new Utilisateur()
    Object.assign(utilisateur, req.body)
    console.log(req.body)

    new Modifier(utilisateur).modifie().then(e => {
        if (e) {
            console.log(e)
            res.status(200).send({ success: "Votre modification a reussi." })
        }
        else {
            console.log("Erreur de maj")
            res.status(200).send({ message: "Une erreure est survenue lors de l'inscription. Veillez rÃ©essayer plutard" })
        }
    })

}
