import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class MovieList extends Component {
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

        })
        return (
            <li key={movies.imdbid}>
                <div>
                    <img src={movies.movieURL}></img>
                    <p>{movies.title}</p>
                    <p>{movies.expiration}</p>
                    <p>Countdown</p>
                    <p>{}</p>
                </div>
            </li>

        )
    }
}