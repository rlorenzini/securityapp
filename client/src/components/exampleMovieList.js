import React, { Component } from 'react';
import brokenImg from '../images/clock.png'
// import { Link } from 'react-router-dom';
// import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';

export class ExampleMovieList extends Component {
    constructor() {
        super()
        this.state = {
            movies: [
                {
                    imdbid: 'tt3114390',
                    title: 'Kill la Kill',
                    expiration: '2019-05-22',
                    synopsis: 'woman with the scissor blade&#39; -- Ryuko Matoi -- searches for clues all around the world for the truth behind her father',
                    released: '2013',
                    imageURL: 'http://occ-0-2433-2705.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABXMs-AB4iYgHqDaxTVJOaSE-rVpAJlh3q8TP4htG4pH7KI4pGP_NE0EtH5DC8sWgS0cQcUGSYOorxgORb7E3m5QS_x7CAo4.jpg?r=206',
                    rating: '7.9'
                }
            ],
            imdbid: '',
            title: '',
            expiration: '',
            synopsis: '',
            released: 0,
            imageURL: '',
            rating: ''
        }
    }
    render() {
        let movies = this.state.movies
        let movieItem = movies.map((movie) => {
            return (
              <div>
              <h1>This is the EXAMPLE list</h1>
                <li key={movie.imdbid}>
                    <div>
                        <img src={movie.imageURL} alt={brokenImg}></img>
                        <p>{movie.title}</p>
                        <p>{movie.expiration}</p>
                        <p>Countdown</p>
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
