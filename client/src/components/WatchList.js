import React, { Component } from 'react';
import movieData from '../movieData.json'
import handleCountdown from './utils/handleCountdown'
import './styling/UserWatchList.css'
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
                this.props.onUpdate(json)
            })
    }

    removeMovie = (e) => {
        fetch('http://localhost:8080/delete-movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imdbid: e.target.id,
                userid: this.state.userid
            })
        }).then((response) => response.json())
            .then(json => {
                // let datified = findExpired(json, movieData)
                this.props.onUpdate(json)
            })
    }
    render() {
        let userList = this.props.watchList
        let datified = findExpired(userList, movieData)
        let movieItems = datified.map((movie) => {
            return (
                <li key={movie.imdbid}>
                    <p className="listElementMovieTitle">{movie.title}</p>
                    <span className="listElementMovieCountdown">{(handleCountdown(movie.date) <= 0) ? <p className="noLongerAvailable">No Longer Available</p> : (handleCountdown(movie.date) === 1) ? <p className="lastDayToWatch">Last Day to Watch</p> : (handleCountdown(movie.date) === 'Available') ? <p>Available</p> : <p>{handleCountdown(movie.date)} days remaining</p>}
                    </span>
                    <button onClick={this.removeMovie} id={movie.imdbid}>Remove</button>
                </li >
            )
        })

        return (
            <div className="userWatchListDiv">
                {(this.props.username === '') ? <h2>User WatchList</h2> : <h2>{this.props.username}'s WatchList</h2>}
                <ul>{movieItems}</ul>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        watchList: state.watchList,
        username: state.username
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
