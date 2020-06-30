import BaseURL from '../utility/BaseURL';
import shuffle from '../utility/shuffle';
import { getTopDestinations } from './selectors';

/*
 * action types
 */

export const SET_DESTINATIONS = 'SET_DESTINATIONS'
export const SET_TOP_DESTINATIONS = 'SET_TOP_DESTINATIONS'
export const SET_FEATURED_DESTINATIONS = 'SET_FEATURED_DESTINATIONS'
export const SET_USER = 'SET_USER'
export const SET_MAP_CENTER = 'SET_MAP_CENTER'
export const SET_MAP_RECT = 'SET_MAP_RECT'
export const SET_ADD_DIVE_SITE_MODE = 'SET_ADD_DIVE_SITE_MODE'
export const SET_ACCOUNT_MODE = 'SET_ACCOUNT_MODE'
export const SET_LOGIN_MODE = 'SET_LOGIN_MODE'
export const SET_REGISTER_MODE = 'SET_REGISTER_MODE'
export const SET_LOG_DIVE_MODE = 'SET_LOG_DIVE_MODE'
export const SET_ADD_PHOTO_MODE = 'SET_ADD_PHOTO_MODE'
export const SET_ADD_REVIEW_MODE = 'SET_ADD_REVIEW_MODE'
export const SET_ALERT_MODE = 'SET_ALERT_MODE'
export const SET_DIVE_SITE = 'SET_DIVE_SITE'

/*
 * action creators
 */


export function setDestinations(destinations) {
  return { type: SET_DESTINATIONS, destinations }
}

export function setTopDestinations(destinations) {
  return { type: SET_TOP_DESTINATIONS, destinations }
}

export function setFeaturedDestinations(destinations) {
  return { type: SET_FEATURED_DESTINATIONS, destinations }
}

export function setUser(user) {
  return { type: SET_USER, user}
}

export function setMapCenter(coordinates) {
  return { type: SET_MAP_CENTER, coordinates}
}

export function setMapRect(coordinates) {
  return { type: SET_MAP_RECT, coordinates}
}

export function setAddDiveSiteMode(enabled) {
  return { type: SET_ADD_DIVE_SITE_MODE, enabled}
}

export function setAccountMode(enabled) {
  return { type: SET_ACCOUNT_MODE, enabled}
}

export function setLoginMode(enabled) {
  return { type: SET_LOGIN_MODE, enabled}
}

export function setRegisterMode(enabled) {
  return { type: SET_REGISTER_MODE, enabled}
}

export function setLogDiveMode(enabled) {
  return { type: SET_LOG_DIVE_MODE, enabled}
}

export function setAddPhotoMode(enabled) {
  return { type: SET_ADD_PHOTO_MODE, enabled}
}

export function setAddReviewMode(enabled) {
  return { type: SET_ADD_REVIEW_MODE, enabled}
}

export function setAlertMode(enabled) {
  return { type: SET_ALERT_MODE, enabled}
}

export function setDiveSite(site) {
  return { type: SET_DIVE_SITE, site}
}

export function fetchDestinations() {
  return function(dispatch, getState) {
    return fetch(BaseURL() + '/api/destinations')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        dispatch(setDestinations(json));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // this.setState({ isLoading: false });
      });
    }
}

export function fetchTopDestinations() {
  return function(dispatch, getState) {
    return fetch(BaseURL() + '/api/destinations/top')
      .then((response) => response.json())
      .then((json) => {

        shuffle(json)
        dispatch(setTopDestinations(json));

        var max = 4
        var featured = []

        for (var i = 0; i < max; i++) {
          featured.push(json[i])
        }

        dispatch(setFeaturedDestinations(featured));

      })
      .catch((error) => console.error(error))
      .finally(() => {
        // this.setState({ isLoading: false });
      });
    }
}

export function fetchDiveSite(id) {
  return function(dispatch, getState) {
    return fetch(BaseURL() + '/api/dive-sites/details/' + id)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        dispatch(setDiveSite(json.diveSite));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // this.setState({ isLoading: false });
    })
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}