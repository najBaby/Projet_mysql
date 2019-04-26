import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import './profil.css'
import Api from '../../api'
import Configuration from './configuration/configuration';
import Travaux from './travaux/travaux'
import CreerProjet from './creerProjet/creerProjet';

export default class Profil extends Component<{}, { redirect: boolean, data: any }> {

    constructor(props: any) {
        super(props)
        this.state = {
            redirect: false,
            data: {}
        }
    }

    componentDidMount = () => {
        Api.get("http://localhost:4000/active").then(e => {
            Api.post('http://localhost:4000/login/utilisateur', { id: e.success.id }).then(r => {
                this.setState({
                    data: r.success
                })
            })
        })
    }

    onRedirect = () => {
        return (<Redirect to="/login" />)
    }

    onLogout = () => {
        Api.get("http://localhost:4000/logout").then(e => {
            if (e.success)
                window.location.assign("/")
        })
    }
    render() {
        console.log(this.state.data)
        if (this.state.redirect) {
            { () => this.onRedirect() }
        } else
            return (
                <div id="profil">
                    <div id="banniere">
                        <h1>BIENVENUE {this.state.data.nom}</h1>
                    </div>
                    <div id="other">
                        <BrowserRouter>
                            <div id="wrap">
                                <div id="me">
                                    <img src={"http://localhost:4000/" + this.state.data.photo} alt="ok" />
                                    <h3>{this.state.data.nom}</h3>
                                    <h4>{this.state.data.profession}</h4>
                                    <a href="#" onClick={() => this.onLogout()}>Logout</a>
                                </div>
                            </div>
                            <div id="donnees">
                                <nav>
                                    <ul>
                                        <li><Link to="/profil">Configuration</Link></li>
                                        <li><Link to="/mesprojets">Mes Projets</Link></li>
                                        <li><Link to="/creerProjet">Creer un projet</Link></li>
                                    </ul>
                                </nav>
                                <Route path="/mesprojets" component={Travaux} />
                                <Route path="/collections" />
                                <Route path="/appreciations" />
                                <Route path="/creerProjet" component={CreerProjet} />
                                <Route path="/profil" component={Configuration} />
                            </div>
                        </BrowserRouter>
                    </div>
                </div>
            )
    }
}