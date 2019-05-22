import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';
import movieData from '../movieDataTest.json'
import handleCountdown from './utils/handleCountdown'
import brokenImg from '../images/clock.png'

export class ExampleWatchList extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <h1>Example WatchList</h1>
            </div>
        )
    }
}
