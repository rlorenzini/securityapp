import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';
import movieData from '../movieDataTest.json'
import handleCountdown from './utils/handleCountdown'
import brokenImg from '../images/clock.png'
export class MovieList extends Component {
    constructor() {
        super()
        this.state = {
            movies: movieData,
            imdbid: '',
            title: '',
            expiration: '',
            synopsis: '',
            released: 0,
            imageURL: '',
            rating: ''
        }
    }
    componentDidMount() {
        let url = "http://localhost:8080/expiring"
        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({
                    ...this.state.movies,
                    movies: json
                })
            })
        // console.log(this.state)

    }
    render() {
        let movies = this.state.movies.ITEMS
        let movieItem = movies.map((movie) => {
            return (
              <div>
              <h1>This is the USER list</h1>
                <li key={movie.imdbid}>
                    <div>
                        <img src={movie.image} alt={brokenImg}></img>
                        <p>{movie.title}</p>
                        <p>{movie.unogsdate}</p>
                        <p>{handleCountdown(movie.unogsdate)} days remaining</p>
                        <p>{}</p>
                    </div>
                </li>
                </div>

            )

        })
        return (
            <ul>{movieItem}</ul>
        )
    }
}
