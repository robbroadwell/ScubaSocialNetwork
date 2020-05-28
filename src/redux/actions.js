/*
 * action types
 */

export const SET_DIVE_SITES = 'SET_DIVE_SITES'
export const SET_SELECTED_DIVE_SITE = 'SET_SELECTED_DIVE_SITE'
export const SET_USER = 'SET_USER'
export const SET_MAP_COORDINATES = 'SET_MAP_COORDINATES'
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

export function setMapCoordinates(coordinates) {
  return { type: SET_MAP_COORDINATES, coordinates}
}

export function setAddDiveSiteMode(enabled) {
  return { type: SET_ADD_DIVE_SITE_MODE, enabled}
}