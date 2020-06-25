import BaseURL from '../utility/BaseURL';

/*
 * action types
 */

export const SET_DIVE_SITES = 'SET_DIVE_SITES'
export const SET_DESTINATIONS = 'SET_DESTINATIONS'
export const SET_TOP_DESTINATIONS = 'SET_TOP_DESTINATIONS'
export const SET_USER = 'SET_USER'
export const SET_MAP_CENTER = 'SET_MAP_CENTER'
export const SET_MAP_RECT = 'SET_MAP_RECT'
export const SET_ADD_DIVE_SITE_MODE = 'SET_ADD_DIVE_SITE_MODE'
export const SET_LOGIN_MODE = 'SET_LOGIN_MODE'
export const SET_ALERT_MODE = 'SET_ALERT_MODE'

/*
 * action creators
 */

export function setDiveSites(diveSites) {
  return { type: SET_DIVE_SITES, diveSites }
}

export function setDestinations(destinations) {
  return { type: SET_DESTINATIONS, destinations }
}

export function setTopDestinations(destinations) {
  return { type: SET_TOP_DESTINATIONS, destinations }
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

export function setLoginMode(enabled) {
  return { type: SET_LOGIN_MODE, enabled}
}

export function setAlertMode(enabled) {
  return { type: SET_ALERT_MODE, enabled}
}

export function fetchDiveSites() {
  return function(dispatch, getState) {
    const coordinates = getState().mapRect;

    return fetch(BaseURL() + '/api/dive-sites?polygon='+`${coordinates}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(setDiveSites(json));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // this.setState({ isLoading: false });
      });
    }
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

    // if (getState().topDestinations.length !== 0) {
    //   return
    // }

    return fetch(BaseURL() + '/api/destinations/top')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        dispatch(setTopDestinations(json));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // this.setState({ isLoading: false });
      });
    }
}
