import { combineReducers } from 'redux'
import auth from './auth'
import requests from './requests'
import offers from './offers'

export default combineReducers({
    auth,
    requests,
    offers
})