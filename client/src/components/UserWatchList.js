import React, { Component } from 'react';
import './styling/UserWatchList.css'
import WatchList from './WatchList.js';
import FindAndAdd from './FindAndAdd.js';

export class UserWatchList extends Component {


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
