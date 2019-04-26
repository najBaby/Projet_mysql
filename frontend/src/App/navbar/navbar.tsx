import React, { Component } from 'react'
import "./navbar.css"
import { StateNavBar } from '../interface'
import { Link, Route, BrowserRouter } from 'react-router-dom'
import Connexion from '../connexion/connexion'
import Inscription from '../inscription/inscription'
import Index from '../index/index'
import Profil from '../profil/profil'
import Api from '../../api'
import Me from '../me/me'


export default class NavBar extends Component<{}, StateNavBar> {
    constructor(props: any) {
        super(props)
        this.state = {
            show: false,
            me: ''
        }
    }


    componentDidMount = () => {
        Api.get('http://localhost:4000/active').then(e => {
            if (e.success) {
                this.setState({
                    show: true,
                })
            }
            else
                this.setState({
                    show: false
                })
        })
    }

    render() {
        let contenu;
        const active =
            <ul>
                <li><Link to="/">Découvrir</Link></li>
                <li><Link to="/rechercher">Réchercher</Link></li>
                <li><Link to="/"><h1>NAJA</h1></Link></li>
                <li><Link to="/profil">Profil</Link></li>
                <li><Me /></li>
            </ul>;
        const nonActive =
            <ul>
                <li><Link to="/">Découvrir</Link></li>
                <li><Link to="/rechercher">Réchercher</Link></li>
                <li><Link to="/"><h1>NAJA</h1></Link></li>
                <li><Link id="connecter" to="/connexion">Se connecter</Link></li>
                <li><Link id="inscrire" to="/inscription">S'inscrire</Link></li>
            </ul>

        if (this.state.show) {
            contenu = active
        } else {
            contenu = nonActive;
        }

        return (
            <BrowserRouter>
                <nav id="navbar">
                    {contenu}
                </nav>
                <Route exact path="/" component={Index} />
                <Route path="/connexion" component={Connexion} />
                <Route path="/inscription" component={Inscription} />
                <Route path="/profil/" component={Profil} />
            </BrowserRouter>
        )
    }
}