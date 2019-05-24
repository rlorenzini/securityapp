import React, { Component } from 'react';
import * as keys from '../.env.json';
import movieData from '../movieData.json'
import handleCountdown from './utils/handleCountdown'
import brokenImg from '../images/clock.png'
import './styling/UserWatchList.css'
import WatchList from './WatchList.js';
import FindAndAdd from './FindAndAdd.js';

export class UserWatchList extends Component {
    constructor() {
        super()
        // this.state = {
        //     watchList: ''
        // }
    }

    render() {
        return (
            <div className="userWatchListBody">
                <div className="lists-container">
                    <div className="watchlist">
                        <WatchList />
                    </div>
                    <div className="omdb-list">
                        <FindAndAdd />
                    </div>
                </div>
            </div>
        )
    }
}
