import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';
import movieData from '../movieDataTest.json'
import handleCountdown from './utils/handleCountdown'
export class MovieList extends Component {
    constructor() {
        super()
        this.state = {
            movies: movieData,
            // movies: [
            //     {
            //         imdbid: 'tt3114390',
            //         title: 'Kill la Kill',
            //         expiration: '2019-05-22',
            //         synopsis: 'woman with the scissor blade&#39; -- Ryuko Matoi -- searches for clues all around the world for the truth behind her father',
            //         released: '2013',
            //         imageURL: 'http://occ-0-2433-2705.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABXMs-AB4iYgHqDaxTVJOaSE-rVpAJlh3q8TP4htG4pH7KI4pGP_NE0EtH5DC8sWgS0cQcUGSYOorxgORb7E3m5QS_x7CAo4.jpg?r=206',
            //         rating: '7.9'
            //     }
            // ],
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
                <li key={movie.imdbid}>
                    <div>
                        <img src={movie.image}></img>
                        <p>{movie.title}</p>
                        <p>{movie.unogsdate}</p>
                        <p>{handleCountdown(movie.unogsdate)} days remaining</p>
                        <p>{}</p>
                    </div>
                </li>

            )

        })
        return (
            <ul>{movieItem}</ul>
        )
    }
}
