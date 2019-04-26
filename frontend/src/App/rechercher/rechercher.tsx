import React, { Component } from 'react'
import './rechercher.css'


export default class Rechercher extends Component {
    render() {
        return (
            <div id="rechercher">
                <div>
                    <form action="">
                        <input type="search" name="search" />
                    </form>
                </div>
                <div>
                    <form action="" method="get">
                        <select name="">
                            <option></option>
                        </select>
                        <select name=""></select>
                        <select name=""></select>
                    </form>
                </div>
            </div>
        )
    }
}