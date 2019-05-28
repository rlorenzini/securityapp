import React, { Component } from 'react';
import { RICHARD_UNOGS_KEY, MIKE_UNOGS_KEY } from '../.env.json';
import movieData from '../movieData.json'
import handleCountdown from './utils/handleCountdown'
import brokenImg from '../images/clock.png'
import "./styling/UserWatchList.css"

export class ExampleWatchList extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="exampleWatchList">
                <h1>Example WatchList</h1>
            </div>
        )
    }
}
