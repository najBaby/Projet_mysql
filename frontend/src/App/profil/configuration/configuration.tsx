import React, { Component } from 'react'
import './configuration.css'
import Api from '../../../api'
import api from 'axios'
import formData from 'form-data';


export default class Configuration extends Component<{}, { data: any }> {

    constructor(props: any) {
        super(props)
        this.state = {
            data: {}
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
        let data = this.state.data

        if (el) {
            el.style.backgroundColor = ''
            el.innerHTML = ''
            Api.get("http://localhost:4000/active").then(r => {
                Object.assign(data, { id: r.success.id })
                console.log(data)
                Api.post("http://localhost:4000/modifier/utilisateur", data).then(e => {
                    if (e.success) {
                        el.style.backgroundColor = 'green'
                        el.innerHTML = e.success
                    }
                })
            })
        }
    }

    modifier = (e: any) => {
        e.preventDefault()
        let data = new formData()
        data.append("image", e.target.files.item(0), e.target.files.item(0).name)
        console.log(e.target.files)

        Api.ajax({
            url: "http://localhost:4000/modifierProfil",
            type: 'post',
            contentType: false,
            processData: false,
            data: data,
            success: (e) => {
                console.log(e.success)
            }
        })
    }
    componentWillMount = () => {
        Api.get("http://localhost:4000/active").then(r => {
            Api.post("http://localhost:4000/login/utilisateur", { id: r.success.id }).then(e => {
                this.setState({
                    data: e.success
                })
            })
        })
    }
    render() {
        return (
            <div id="configuration">
                <form method="post" onSubmit={(e) => this.onSubmit(e)} >
                    <div>
                        <label htmlFor="image">Photo de profil:</label>
                        <input onChange={(e) => this.modifier(e)} type="file" name="image" accept="image/*" id="image" />
                    </div>

                    <div>
                        <label htmlFor="nom">Nom:</label>
                        <input onBlur={(e) => this.onChange(e)} type="text" name="nom" id="nom" value={this.state.data.nom} />
                    </div>

                    <div>
                        <label htmlFor="profession">Profession:</label>
                        <input onBlur={(e) => this.onChange(e)} type="text" name="profession" id="profession" value={this.state.data.profession} />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input onBlur={(e) => this.onChange(e)} type="email" name="email" id="email" value={this.state.data.email} />
                    </div>

                    <div>
                        <label htmlFor="password">Mot de passe:</label>
                        <input onBlur={(e) => this.onChange(e)} type="password" name="password" id="password" />
                    </div>

                    <div>
                        <button type="submit">Enregistrer</button>
                    </div>

                    <div id="message"></div>
                </form>
            </div>
        )
    }
}