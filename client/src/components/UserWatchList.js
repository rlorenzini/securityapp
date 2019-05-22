import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';
import movieData from '../movieDataTest.json'
import handleCountdown from './utils/handleCountdown'
import brokenImg from '../images/clock.png'
import './styling/UserWatchList.css'

export class UserWatchList extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            returnedMovies: [],
        }
    }

    handleFindMovie = () => {
        let title = this.state.title
        let moviesURL = "http://www.omdbapi.com/?s=" + title + "&apikey=1f0fd775"

        console.log(title)
        fetch(moviesURL)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({
                    returnedMovies: json.Search
                })
            }).then(() => {
                console.log(this.state.returnedMovies)
            })
    }


    handleTextBoxChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            console.log(this.state.title)
            let omdbList = this.state.returnedMovies
            let movieItems = omdbList.map((movie) => {
                return (
                    movie.imdbID
                )
            })
            console.log(movieItems)
        })
    }

    handleAddToWatchList = () => {
        console.log("Clicked")
    }

    render() {
        let omdbList = this.state.returnedMovies
        let movieItems = omdbList.map((movie) => {
            return (
                <li key={movie.imdbID}>
                    <img className="omdb-poster" src={movie.Poster}></img>
                    <p>{movie.Title}</p>
                    <button onClick={this.handleAddToWatchList}>Add to Watch List</button>
                </li>
            )
        })
        return (
            <div>
                <h1>Your WatchList</h1>
                <input type="text" onChange={this.handleTextBoxChange} name="title" placeholder="Movie Title"></input>
                <button onClick={this.handleFindMovie}>Find Movie</button>
                <div className="lists-container">
                    <div className="watchlist">
                        <ul>Watchlist goes here</ul>
                    </div>
                    <div className="omdb-list">
                        <h1>OMDB movies go here</h1>
                        <ul>{movieItems}</ul>

                    </div>

                </div>
            </div>
        )
    }
}

