import BaseURL from '../utility/BaseURL';
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
export const SET_ALERT_MODE = 'SET_ALERT_MODE'

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

export function setAlertMode(enabled) {
  return { type: SET_ALERT_MODE, enabled}
}

export function fetchDestinations() {
  return function(dispatch, getState) {

    // if (getState().destinations.length !== 0) {
    //   return
    // }

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

    console.log(process.env.NODE_ENV === "development")

    if (getState().topDestinations.length !== 0) {
      return
    }

    return fetch(BaseURL() + '/api/destinations/top')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        dispatch(setTopDestinations(json));

        var i = 0;
        var max = 4
        var usedIndexes = []
        var featured = []

        while (i < max) {
          var random = getRandomInt(json.length)
          if (usedIndexes.includes(random)) {
            continue // generate \(max) unique featured destinations
          }

          featured.push(json[random])
          usedIndexes.push(random)
          i += 1
        }

        console.log(featured)
        dispatch(setFeaturedDestinations(featured));

      })
      .catch((error) => console.error(error))
      .finally(() => {
        // this.setState({ isLoading: false });
      });
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}