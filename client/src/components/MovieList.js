import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';

export class MovieList extends Component {
    constructor() {
        super()
        this.state = {
            movies: [],
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
        return (
            <h1>Movie List</h1>
        )
    }
}
