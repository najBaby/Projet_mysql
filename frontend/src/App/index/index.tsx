import React, { Component } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './index.css'
import Nouveaux from './nouveaux/nouveaux'
import Actualites from './actualites/actualites'

export default class Index extends Component {


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
    render() {
        return (
            <BrowserRouter>
                <div id="presentation">
                    <canvas></canvas>
                    <h1>PRÉSENTEZ ET DÉCOUVREZ<br />DES TRAVAUX DE CREATION</h1>
                </div>
                <nav id="index">
                    <ul>
                        <li><Link to="/">NOUVEAUTÉS</Link></li>
                        <li><Link to="/galeries">GALERIES</Link></li>
                        <li><Link to="/aide">AIDE</Link></li>
                    </ul>
                </nav>
                <Route exact path="/" component={Nouveaux} />
                <Route path="/actualites" component={Actualites} />
                <Route path="/galeries" />
                <Route path="/ecole_organisation" />
                <Route path="/aide" />
            </BrowserRouter>
        )
    }
}