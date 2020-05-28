/*
 * action types
 */

export const SET_DIVE_SITES = 'SET_DIVE_SITES'
export const SET_SELECTED_DIVE_SITE = 'SET_SELECTED_DIVE_SITE'
export const SET_USER = 'SET_USER'

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
