import 'reflect-metadata'
// import { createServer, Server } from 'http'
import express from 'express'
// import socketIO from 'socket.io'

import cookiesParser from 'cookie-parser'
import cors from 'cors'
import { Routes } from './routes'
import { uploads } from './tools/multer'
import { parseCookieAll } from './tools/token'
import path from 'path'

import { createConnection } from 'typeorm'
import { NextFunction, Request, Response, Express } from 'express';


// NOTRE SERVEUR
export default class App {
  protected app: Express
  // protected server: Server
  // protected io: socketIO.Server
  protected port: number
  protected axio: any

  constructor(routes: Routes[]) {
    this.config()
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.start()
  }

  // toutes les configurations de notre application App
  protected config() {
    this.app = express() /* initialisation de notre application express */
    try {
      createConnection() /* La connection avec notre base de données */
      // this.server = createServer(this.app) /* la creation de notre serveur */
      this.port = 4000 /* le port pour notre serveur */
      // this.io = socketIO(this.server) /* initialisation de notre application Socket.io pour la communication en temps réel */
    } catch (e) {
      console.log(e)
    }
  }


  // toutes les fonctions middlewares de notre application App
  protected initializeMiddlewares() {
  /* les outils pour express */ /**//**/
  /**/  this.app.use(express.json()) /**/
  /**/  this.app.use(express.urlencoded({ extended: true })) /**/
  /**/  this.app.use(cors()) /**/
  /**/  this.app.use(express.static(path.join(__dirname, "./tools/uploads"))) /**/
  /**/  this.app.use(cookiesParser()) /**/
  /**/  this.app.use((req, res, next) => {
    console.log(req.body)
    parseCookieAll(req, res, next)
  }) /**/
    this.app.use((_req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Credentials', 'true')
      res.header("Access-Control-Allow-Origin", 'http://localhost:3000')
      res.header('Content-Type', 'application/json;charset=UTF-8')
      next()
    })
  }


  // les routes de notre application App
  protected initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app[route.method](route.path, uploads.single('image'), async (request: Request, response: Response) => {
        route.action(request, response)
      })
    })
  }

  // Le lancement de notre serveur
  protected start() {
    this.app.listen(this.port, () => {
      console.log("Server runnig on port ", this.port)
    })

    // this.io.on("connection", (socket) => {
    //   console.log("Mon Nouvel Utilisateur")
    //   socket.on("message", (m) => {
    //     console.log(m)
    //     this.io.emit("message", m)
    //   })
    // })
  }
}
