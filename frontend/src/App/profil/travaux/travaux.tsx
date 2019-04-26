import React, { Component } from 'react'
import './travaux.css'
import Api from 'axios'
import j from '../../../api'
import formData from 'form-data'

export default class Travaux extends Component {

    onSubmit = (e: any) => {
        e.preventDefault()
        // let image = document.querySelector("#image")
        // if (image) {

        let data = new formData()
        data.append("image", e.target.files.item(0), e.target.files.item(0).name)
        console.log(e.target.files)

        j.ajax({
            url: "http://localhost:4000/upload",
            type: 'post',
            contentType: false,
            processData: false,
            data: data,
            success: (e) => {
                console.log(e.success)
            }
        })

        // Api.post("http://localhost:4000/upload", data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then(e => {
        //     console.log(e.data.success)
        // })
        // }

        // Api.post("http://localhost:4000/upload", data).then(e => {
        //     if (e)
        //         console.log(e.success)
        //     else
        //         console.log(e.message)
        // })

    }
    render() {
        return (
            <div>
                <form action="http://localhost:4000/upload" encType="multipart/form-data" method="post">
                    <input type="text" name="nom" placeholder="Entrez le nom du projet" />
                    <input onChange={(e) => this.onSubmit(e)} type="file" name="image" id="image" accept="image/*" />
                    <button type="submit">Envoyer</button>
                </form>
            </div>
        )
    }
}
