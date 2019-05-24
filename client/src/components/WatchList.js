import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import * as keys from '../.env.json';
import movieData from '../movieData.json'
import handleCountdown from './utils/handleCountdown'
import brokenImg from '../images/clock.png'
import './styling/UserWatchList.css'
import axios from 'axios';

export class WatchList extends Component {
    constructor() {
        super()
        this.state = {
            watchList: [],
            userid: localStorage.getItem('userid')
        }
    }
    componentDidMount() {
        console.log(this.state.userid)
        let url = "http://localhost:8080/user-watch-list"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: this.state.userid
            })
        }).then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({
                    watchList: json
                })
            })

    }


    render() {
        let userList = this.state.watchList
        let movieItems = userList.map((movie) => {
            return (
                <li key={movie.imdbID}>
                    <p>{movie.title}</p>
                </li>
            )
        })

        return (
            <div className="userWatchListDiv">
                <h1>Your WatchList</h1>
                <ul>{movieItems}</ul>
            </div>
        )
    }
}
