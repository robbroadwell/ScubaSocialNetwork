import { combineReducers } from 'redux'
import {
  SET_USER, SET_DIVE_SITES, SET_SELECTED_DIVE_SITE
} from './actions'

function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}

function diveSites(state = [], action) {
  switch (action.type) {
    case SET_DIVE_SITES:
      return action.diveSites
    default:
      return state
  }
}

function selectedDiveSite(state = [], action) {
  switch (action.type) {
    case SET_SELECTED_DIVE_SITE:
      return action.diveSite
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  diveSites,
  selectedDiveSite
})

export default rootReducer