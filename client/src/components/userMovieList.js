import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';
import movieData from '../movieData.json'
import handleCountdown from './utils/handleCountdown'
import brokenImg from '../images/clock.png'



export class MovieList extends Component {
    constructor(props) {
        super(props)
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
                // console.log(json)
                this.setState({
                    ...this.state.movies,
                    movies: json
                })
                localStorage.setItem('movieData', JSON.stringify(json))
            })
    }
    render() {
        // MIKES'S CODE =======
        let movies = []
        if (localStorage.getItem('movieData') === null) {
            movies = this.state.movies.ITEMS
        } else {
            movies = JSON.parse(localStorage.getItem('movieData')).ITEMS
        }
        // MIKES'S CODE ======
        let movieItem = movies.map((movie) => {
            return (
                <div>
                    <li key={movie.imdbid}>
                        <div>
                            <img src={movie.image} alt={brokenImg}></img>
                            <p>{movie.title}</p>
                            <p>{movie.unogsdate}</p>
                            <p>{(handleCountdown(movie.unogsdate) === 0) ? `No Longer Available` : (handleCountdown(movie.unogsdate) === 1) ? `Last Day to Watch` : `${handleCountdown(movie.unogsdate)} days remaining`}</p>
                            <p>{}</p>
                        </div>
                    </li>
                </div>

            )

        })
        return (
            <div>
                <h1>This is the USER list</h1>
                <ul>{movieItem}</ul>
            </div>
        )
    }
}
