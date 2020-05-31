import { combineReducers } from 'redux'
import {
  SET_USER, SET_DIVE_SITES, SET_SELECTED_DIVE_SITE, SET_MAP_CENTER, SET_MAP_RECT, SET_ADD_DIVE_SITE_MODE
} from './actions'

function user(state = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}

function mapCenter(state = [], action) {
  switch (action.type) {
    case SET_MAP_CENTER:
      return action.coordinates
    default:
      return state
  }
}

function mapRect(state = [], action) {
  switch (action.type) {
    case SET_MAP_RECT:
      return action.coordinates
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

function selectedDiveSite(state = null, action) {
  switch (action.type) {
    case SET_SELECTED_DIVE_SITE:
      if (state && state._id && state._id === action.diveSite._id) {
        return null;
      } else {
        return action.diveSite;
      }
    default:
      return state
  }
}

function addDiveSiteMode(state = false, action) {
  switch (action.type) {
    case SET_ADD_DIVE_SITE_MODE:
      return action.enabled
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  mapCenter,
  mapRect,
  diveSites,
  selectedDiveSite,
  addDiveSiteMode
})

export default rootReducer
