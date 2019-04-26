import { Request, Response } from 'express'

export async function uploadImage(req: Request, res: Response) {
    if (req.file) {

        res.send({ success: true })
    } else {
        console.log("Download Failed")
        res.send({ message: false })
    }
}