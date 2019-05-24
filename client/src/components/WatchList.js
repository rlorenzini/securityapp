import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import * as keys from '../.env.json';
import movieData from '../movieData.json'
import handleCountdown from './utils/handleCountdown'
import brokenImg from '../images/clock.png'
import './styling/UserWatchList.css'
import axios from 'axios';
import store from '../components/stores/store'
import { connect } from 'react-redux'
import findExpired from '../components/utils/findExpired'



class WatchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            watchList: [],
            userid: localStorage.getItem('userid')
        }
    }
    componentDidMount() {
        console.log(this.state.userid)
        let url = "http://localhost:8080/user-watch-list"
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: this.state.userid
            })
        }).then(response => response.json())
            .then(json => {
                // ======TESTING =======
                this.props.onUpdate(json)
                // console.log(json)
                //====== TESTING END ======
                // console.log(json)
                // this.setState({
                //     watchList: json
                // })
            })
        // console.log(this.props.WatchList)

    }


    render() {
        let userList = this.props.watchList
        console.log(userList)
        let datified = findExpired(userList, movieData)
        console.log(datified)
        let movieItems = datified.map((movie) => {
            return (
                <li key={movie.imdbid}>
                    <p>{movie.title}</p>
                    <p>{movie.date}</p>
                </li>
            )
        })

        return (
            <div className="userWatchListDiv">
                <h1>Your WatchList</h1>
                <ul>{movieItems}</ul>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        watchList: state.watchList
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

export default connect(mapStateToProps, mapDispatchToProps)(WatchList) 