import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
const secret = "M@ VIE CEST M@ Mere"

export async function createToken(object: Object) {
  return jwt.sign({
    id: (<any>object).id,
    name: object.constructor.name
  }, secret, {
      expiresIn: '1h'
    })
}

export async function deleteToken(_req: Request, res: Response) {
  res.clearCookie("Token").send({ success: true })
}

export async function parseCookie(req: Request, res: Response) {
  const { Token } = req.cookies
  console.log(req.cookies)
  async function clearCookie() {
    res.clearCookie("Token").send({ message: false })
  }

  if (Token == undefined) {
    console.log("WEWE EPI")
    clearCookie()

  } else {
    try {
      let jwtToken = jwt.verify(Token, secret);
      res.send({ success: jwtToken })
    } catch (error) {
      console.log("WEWE")
      clearCookie()
    }
  }
}

export async function parseCookieAll(req: Request, res: Response, next: NextFunction) {
  async function clearCookie() {
    res.clearCookie("Token")
    next()
  }
  const { Token } = req.cookies
  console.log(req.cookies)
  console.log(Token)


  if (Token == undefined) {
    console.log("WEWE EPI")
    clearCookie()

  } else {
    try {
      let jwtToken = jwt.verify(Token, secret);
      (<any>req).decoded = jwtToken;
      next()
    } catch (error) {
      console.log("WEWE")
      clearCookie();
      (<any>req).decoded = undefined;
    }
  }
}
