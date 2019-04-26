import React, { Component } from 'react'
import './creerProjet.css'
import Api from '../../../api'
import formData from 'form-data'

export default class CreerProjet extends Component<{}, { data: any }> {

    constructor(props: any) {
        super(props)
        this.state = {
            data: {}
        }
    }

    modifier = (e: any) => {
        e.preventDefault()
        let data = new formData()
        data.append("image", e.target.files.item(0), e.target.files.item(0).name)
        console.log(e.target.files);
        let otherdata = {};
        Object.assign(otherdata, this.state.data)

        Api.ajax({
            url: "http://localhost:4000/creerProjet",
            type: 'post',
            contentType: false,
            processData: false,
            data: data,
            success: (e) => {
                console.log(e.success)
            }
        })
    }

    onSubmit = (e: any) => {
        e.preventDefault()
        const el = document.getElementById('message')
        let data = this.state.data

        if (el) {
            el.style.backgroundColor = ''
            el.innerHTML = ''

            Api.post("http://localhost:4000/modifierProjet", data).then(e => {
                if (e.success) {
                    el.style.backgroundColor = 'green'
                    el.innerHTML = e.success
                }
            })
        }
    }

    onChange = (event: any) => {
        const { name, value } = event.target
        const data = {
            [name]: value
        }
        Object.assign(this.state.data, data)
    }
    render() {
        return (
            <div id='creerProjet'>
                <form method="post" onSubmit={(e) => this.onSubmit(e)} >
                    <div>
                        <label htmlFor="image">Photo de Couverture:</label>
                        <input onChange={(e) => this.modifier(e)} type="file" name="image" accept="image/*" id="image" />
                    </div>

                    <div>
                        <label htmlFor="nom">Nom:</label>
                        <input onBlur={(e) => this.onChange(e)} type="text" name="nom" id="nom" value={this.state.data.nom} />
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