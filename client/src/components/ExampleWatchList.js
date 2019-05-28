import React, { Component } from 'react';
import movieData from '../movieData.json'
import handleCountdown from './utils/handleCountdown'
import "./styling/UserWatchList.css"

export class ExampleWatchList extends Component {
    render() {
        return (
            <div className="exampleWatchList">
                <h1>Example WatchList</h1>
            </div>
        )
    }
}
