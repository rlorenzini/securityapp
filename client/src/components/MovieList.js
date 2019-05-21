import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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