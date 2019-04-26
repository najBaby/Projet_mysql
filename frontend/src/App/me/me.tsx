import React, { Component } from 'react'
import './me.css'
import Api from '../../api'
import { url } from 'inspector';


export default class Me extends Component<{}, { data: any }> {
    constructor(props: any) {
        super(props)
        this.state = {
            data: {}
        }
    }

    componentWillMount = () => {
        Api.get("http://localhost:4000/active").then(e => {
            Api.post("http://localhost:4000/login/utilisateur", { id: e.success.id }).then(r => {
                this.setState({
                    data: r.success
                })
            })
        })
    }

    onLogout = (e: any) => {
        e.preventDefault()
        Api.get("http://localhost:4000/logout").then(e => {
            if (e.success)
                window.location.assign("/")
        })
    }

    render() {
        return (
            <div id="moi">
                <img src={"http://localhost:4000/" + this.state.data.photo} />
                <div>
                    <ul>
                        <li><span>Bienvenue </span> <strong>  {this.state.data.nom || ''}</strong></li>
                        <li>{this.state.data.email || ''}</li>
                        <li><a href="/logout" onClick={(e) => this.onLogout(e)}>Deconnexion</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}