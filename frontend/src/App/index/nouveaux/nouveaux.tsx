import React, { Component } from 'react'
import Api from '../../../api'
import './nouveaux.css'


export default class Nouveaux extends Component<{}, { data: [] }> {

    constructor(props: any) {
        super(props)

        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        Api.get("http://localhost:4000/rechercherTout").then(e => {
            this.setState({
                data: e.success
            })
        })
    }

    render() {
        console.log(this.state.data)
        let content = () => {
            const data: any[] = []
            this.state.data.forEach((el: any, index: any) => {
                data.push(<div key={el.id}><img src={"http://localhost:4000/" + el.photo} /><div>{el.email}</div><div></div></div>)
            })

            return data
        }
        return (
            <div id="nouveaux">
                {content()}
            </div>
        )
    }
}