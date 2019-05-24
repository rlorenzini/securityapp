import { createStore, combineReducers } from 'redux'
import userReducer from './reducers/reducer'
import wlReducer from './reducers/wlReducer'


export default combineReducers({
    userReducer,
    wlReducer

})
