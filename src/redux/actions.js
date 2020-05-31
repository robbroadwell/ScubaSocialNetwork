/*
 * action types
 */

export const SET_DIVE_SITES = 'SET_DIVE_SITES'
export const SET_SELECTED_DIVE_SITE = 'SET_SELECTED_DIVE_SITE'
export const SET_USER = 'SET_USER'
export const SET_MAP_CENTER = 'SET_MAP_CENTER'
export const SET_MAP_RECT = 'SET_MAP_RECT'
export const SET_ADD_DIVE_SITE_MODE = 'SET_ADD_DIVE_SITE_MODE'

/*
 * action creators
 */

export function setDiveSites(diveSites) {
  return { type: SET_DIVE_SITES, diveSites }
}

export function setSelectedDiveSite(diveSite) {
  return { type: SET_SELECTED_DIVE_SITE, diveSite }
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

export function fetchDiveSites() {
  return function(dispatch, getState) {
    const coordinates = getState().mapRect;
    console.log(coordinates)

    return fetch('https://www.divingscore.com/api/dive-sites?polygon='+`${coordinates}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        dispatch(setDiveSites(json));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // this.setState({ isLoading: false });
      });
    }
}
