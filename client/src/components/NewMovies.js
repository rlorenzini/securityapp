import React, { Component } from 'react';
import handleCountdown from './utils/handleCountdown'
import './styling/movieList.css'
import replaceASCII from './utils/replaceASCII'
import movieData from '../movieData.json'


export class NewMovies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: ''
        }
    }
    componentDidMount() {
        let url = "http://localhost:8080/new-releases"
        fetch(url)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ...this.state.movies,
                    movies: json
                })
                localStorage.setItem('newMovies', JSON.stringify(json))
                console.log(json)
            })
    }
    render() {
        let movies = []
        movies = JSON.parse(localStorage.getItem('newMovies')).ITEMS
        console.log(movies)
        let movieItem = movies.map((movie) => {
            let str = replaceASCII(movie.title)
            return (
                <div className="listElementContainer">
                    <li className="listElement" key={movie.imdbid}>
                        <div>
                            <img src={movie.image} alt={movie.image}></img>
                            <p className="listElementMovieTitle">{str}</p>
                            {/* <p className="listElementMovieEndDate">{movie.unogsdate}</p> */}
                            <span className="listElementMovieCountdown">Available</span>
                        </div>
                    </li>
                </div>

            )

        })
        return (
            <div className="listElementBody">
                <div className="listElementHeader">
                    <h1>New Arrivals</h1>
                </div>
                <ul className="movieItemList">{movieItem}</ul>
            </div>
        )
    }
}
