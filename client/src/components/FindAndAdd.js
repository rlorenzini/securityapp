import React, { Component } from 'react';
import * as keys from '../.env.json';
import movieData from '../movieData.json'
import './styling/UserWatchList.css'
import { connect } from 'react-redux'
import findExpired from './utils/findExpired'

class FindAndAdd extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            returnedMovies: [],
            userid: localStorage.getItem('userid')
        }
    }

    handleFindMovie = () => {
        let title = this.state.title
        let moviesURL = "http://www.omdbapi.com/?s=" + title + "&apikey=" + keys.OMDB_API_KEY

        fetch(moviesURL)
            .then(response => response.json())
            .then(json => {
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
        })
    }

    handleAddToWatchList = (e) => {
        fetch('http://localhost:8080/add-movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: e.target.name,
                imdbID: e.target.id,
                userid: this.state.userid
            })
        }).then((response) => response.json())
            .then(json => {
                this.props.onUpdate(json)
            })

    }

    render() {
        let omdbList = this.state.returnedMovies
        let movieItems = omdbList.map((movie) => {
            return (
                <li key={movie.imdbID}>
                    <img className="omdb-poster" alt={movie.Poster} src={movie.Poster}></img>
                    <p>{movie.Title}</p>
                    <button onClick={this.handleAddToWatchList} name={movie.Title} id={movie.imdbID}>Add to Watch List</button>
                </li>
            )
        })
        return (
            <div className="omdbDiv">
                <h1>OMDB movies go here</h1>
                <div>
                    <input type="text" onChange={this.handleTextBoxChange} name="title" placeholder="Movie Title"></input>
                    <button onClick={this.handleFindMovie}>Find Movie</button>
                </div>
                <ul className="ombd-li">{movieItems}</ul>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (json) => dispatch({
            type: 'UPDATE',
            value: json
        })
    }
}
export default connect(null, mapDispatchToProps)(FindAndAdd)
