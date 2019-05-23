import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import * as keys from '../.env.json';
import movieData from '../movieData.json'
import handleCountdown from './utils/handleCountdown'
import brokenImg from '../images/clock.png'
import './styling/UserWatchList.css'

export class WatchList extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            returnedMovies: [],
        }
    }

    handleAddToWatchList = (e) => {
        console.log("Clicked")
        console.log(e.target.name)
        console.log(e.target.id)
        fetch('http://localhost:8080/add-movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: e.target.name,
                imdbID: e.target.id
            })
        })



    }

    render() {
        // let omdbList = this.state.returnedMovies
        // let movieItems = omdbList.map((movie) => {
        //     return (
        //         <li key={movie.imdbID}>
        //             <img className="omdb-poster" src={movie.Poster}></img>
        //             <p>{movie.Title}</p>
        //             <button onClick={this.handleAddToWatchList} name={movie.Title} id={movie.imdbID}>Add to Watch List</button>
        //         </li>
        //     )
        // })
        return (
            <div>
                <h1>Your WatchList</h1>
            </div>
        )
    }
}
