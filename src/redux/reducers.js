import { combineReducers } from 'redux'
import {
  SET_USER, SET_MAP_CENTER, SET_MAP_RECT, SET_ADD_DIVE_SITE_MODE, SET_ACCOUNT_MODE, SET_LOGIN_MODE, SET_REGISTER_MODE, SET_ALERT_MODE, SET_DESTINATIONS, SET_TOP_DESTINATIONS, SET_FEATURED_DESTINATIONS, SET_LOG_DIVE_MODE, SET_ADD_PHOTO_MODE, SET_ADD_REVIEW_MODE, SET_DIVE_SITE 
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

function destinations(state = [], action) {
  switch (action.type) {
    case SET_DESTINATIONS:
      return action.destinations
    default:
      return state
  }
}

function topDestinations(state = [], action) {
  switch (action.type) {
    case SET_TOP_DESTINATIONS:
      return action.destinations
    default:
      return state
  }
}

function featuredDestinations(state = [], action) {
  switch (action.type) {
    case SET_FEATURED_DESTINATIONS:
      return action.destinations
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

function accountMode(state = false, action) {
  switch (action.type) {
    case SET_ACCOUNT_MODE:
      return action.enabled
    default:
      return state
  }
}

function loginMode(state = false, action) {
  switch (action.type) {
    case SET_LOGIN_MODE:
      return action.enabled
    default:
      return state
  }
}

function registerMode(state = false, action) {
  switch (action.type) {
    case SET_REGISTER_MODE:
      return action.enabled
    default:
      return state
  }
}

function logDiveMode(state = false, action) {
  switch (action.type) {
    case SET_LOG_DIVE_MODE:
      return action.enabled
    default:
      return state
  }
}

function addPhotoMode(state = false, action) {
  switch (action.type) {
    case SET_ADD_PHOTO_MODE:
      return action.enabled
    default:
      return state
  }
}

function addReviewMode(state = false, action) {
  switch (action.type) {
    case SET_ADD_REVIEW_MODE:
      return action.enabled
    default:
      return state
  }
}

function alertMode(state = true, action) {
  switch (action.type) {
    case SET_ALERT_MODE:
      return action.enabled
    default:
      return state
  }
}

function diveSite(state = true, action) {
  switch (action.type) {
    case SET_DIVE_SITE:
      return action.site
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  mapCenter,
  mapRect,
  destinations,
  topDestinations,
  featuredDestinations,
  addDiveSiteMode,
  accountMode,
  loginMode,
  registerMode,
  logDiveMode,
  addPhotoMode,
  addReviewMode,
  alertMode,
  diveSite
})

export default rootReducer
