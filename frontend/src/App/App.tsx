import React, { Component } from 'react';
import NavBar from './navbar/navbar';
import './App.css';
import axios from 'axios'

export default class App extends Component {

  constructor(props: any) {
    super(props)

    this.state = {
      data: {}
    }
  }

 

  render() {
    return (
      <div id="App" >
        <NavBar />
      </div>
    );
  }
}
