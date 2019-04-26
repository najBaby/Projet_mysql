import React, { Component } from 'react'
import './connexion.css'
import { StateConnexion } from '../interface'
import Api from '../../api'
import { Loading } from '../Loading/loading'

export default class Connexion extends Component<{}, { data: any, loading: boolean }> {

    constructor(props: any) {
        super(props)
        this.state = {
            data: {},
            loading: false
        }

    }


    componentDidMount = () => {

        document.addEventListener('touchmove', function (e) {
            e.preventDefault()
        })
        var c = document.getElementsByTagName('canvas')[0],
            pr = window.devicePixelRatio || 1,
            w = window.innerWidth,
            h = window.innerHeight,
            f = 90,
            q: any,
            m = Math,
            r = 0,
            u = m.PI * 2,
            v = m.cos,
            z = m.random,
            x = c.getContext('2d');
        c.width = w * pr
        c.height = h * pr
        if (x) {

            x.scale(pr, pr)
            x.globalAlpha = 0.6
            function i() {
                if (x) {
                    x.clearRect(0, 0, w, h)
                    q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
                    while (q[1].x < w + f) d(q[0], q[1])
                }
            }
            function d(i: any, j: any) {
                if (x) {
                    x.beginPath()
                    x.moveTo(i.x, i.y)
                    x.lineTo(j.x, j.y)
                    var k = j.x + (z() * 2 - 0.25) * f,
                        n = y(j.y)
                    x.lineTo(k, n)
                    x.closePath()
                    r -= u / -50
                    x.fillStyle = '#' + (v(r) * 127 + 128 << 8 | v(r + u / 3) * 127 + 128 << 4 | v(r + u / 3 * 2) * 127 + 128).toString(16)
                    x.fill()
                    q[0] = q[1]
                    q[1] = { x: k, y: n }
                }
            }
            function y(p: any): any {
                var t = p + (z() * 2 - 1.1) * f
                return (t > h || t < 0) ? y(p) : t
            }
            document.onclick = i
            document.ontouchstart = i
            i()
        }

    }

    onChange = (event: any) => {
        const { name, value } = event.target
        const data = {
            [name]: value
        }
        Object.assign(this.state.data, data)
    }

    onSubmit = (e: any) => {
        e.preventDefault()
        const el = document.getElementById('message')
        this.setState({
            loading: true
        })
        if (el) {
            const data = this.state.data
            el.style.backgroundColor = ''
            el.innerHTML = ''
            Api.post('http://localhost:4000/login/utilisateur', data).then(r => {
                this.setState({
                    loading: false
                })
                if (r.message) {
                    el.style.backgroundColor = 'red'
                    el.innerHTML = r.message
                } else {
                    window.location.assign("/")
                }
            })
        }
    }

    render() {
        const content =
            <form onSubmit={(e) => this.onSubmit(e)} method="post">
                <div className="input">
                    <h2>Connectez-vous</h2>
                </div>

                <div className="input">
                    <input type="email" required name="email" onChange={(e) => this.onChange(e)} placeholder='Votre email' autoFocus={true} />
                </div>

                <div className="input">
                    <input type="password" required minLength={8} name="password" onChange={(e) => this.onChange(e)} placeholder='Votre mot de passe' />
                    <h6> <a href="#">mot de passe oublie</a> ?</h6>
                </div>
                <div className="input">
                    <button type="submit" >Me connecter</button>
                </div>
                {/* <div className="input">
                    <h6>Se connecter etant une <a href="#">ecole/organisation</a> !</h6>
                </div> */}
            </form>
        let myLoading = <Loading />
        let contenu;
        if (this.state.loading) {
            contenu = myLoading
        } else {
            contenu = content
        }
        return (
            <div id="connexion">
                <canvas></canvas>
                <div id="message">
                </div>
                {contenu}
            </div>
        )
    }
}