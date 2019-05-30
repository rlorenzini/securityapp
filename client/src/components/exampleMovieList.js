import React, { Component } from 'react';
import handleCountdown from './utils/handleCountdown'
import './styling/movieList.css'
import replaceASCII from './utils/replaceASCII'
import movieData from '../movieData.json'

export class ExampleMovieList extends Component {
    constructor(props) {
        let url = "http://localhost:8080/expiring"
        fetch(url, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ...this.state.movies,
                    movies: json
                })
                localStorage.setItem('movieData', JSON.stringify(json))
            })

        super(props)
        this.state = {
            movies: '',
            loading: true
        }
    }
    componentDidMount() {
        let url = "http://localhost:8080/expiring"
        fetch(url, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ...this.state.movies,
                    loading: false,
                    movies: json
                })
                localStorage.setItem('movieData', JSON.stringify(json))
            })
    }
    render() {
        let movies = []
        let movieItem = (<p>Loading</p>)
        if (!this.state.loading) {
            movies = JSON.parse(localStorage.getItem('movieData')).ITEMS
            movieItem = movies.map((movie) => {
                let str = replaceASCII(movie.title)
                return (
                    <div className="listElementContainer">
                        <li className="listElement" key={movie.imdbid}>
                            <div>
                                <img src={movie.image} alt={movie.image}></img>
                                <p className="listElementMovieTitle">{str}</p>
                                <p className="listElementMovieEndDate">{movie.unogsdate}</p>
                                <span className="listElementMovieCountdown">{(handleCountdown(movie.unogsdate) <= 0) ? <p className="noLongerAvailable">No Longer Available</p> : (handleCountdown(movie.unogsdate) === 1) ? <p className="lastDayToWatch">Last Day to Watch</p> : `${handleCountdown(movie.unogsdate)} days remaining`}</span>
                            </div>
                        </li>
                    </div>

                )

            })
        }
        return (
            <div className="listElementBody">
                <div className="listElementHeader">
                    <h1>This is What's Leaving</h1>
                </div>
                <ul className="movieItemList">{movieItem}</ul>
            </div>
        )
    }
}
