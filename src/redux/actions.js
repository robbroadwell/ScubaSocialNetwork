/*
 * action types
 */

export const SET_SEARCH_TAB = 'SET_SEARCH_TAB'
export const SET_SHOP_TAB = 'SET_SHOP_TAB'
export const SET_ACCOUNT_TAB = 'SET_ACCOUNT_TAB'
export const SET_DIVE_SITE_TAB = 'SET_DIVE_SITE_TAB'

/*
 * other constants
 */

export const SearchTabs = {
  DIVE_SITES: 'DIVE_SITES',
  LIVEABOARDS: 'LIVEABOARDS',
  RESORTS: 'RESORTS',
  DESTINATIONS: 'DESTINATIONS',
  SHOPS: 'SHOPS',
  SHIP_WRECKS: 'SHIP_WRECKS'
}

export const ShopTabs = {
  DIVE_COMPUTERS: 'DIVE_COMPUTERS',
  BCS: 'BCS',
  REGULATORS: 'REGULATORS',
  WETSUITS: 'WETSUITS',
  MASKS: 'MASKS',
  ACCESSORIES: 'ACCESSORIES'
}

export const AccountTabs = {
  LEADERBOARD: 'LEADERBOARD',
  REVIEWS: 'REVIEWS',
  FAVORITES: 'FAVORITES',
  OFFLINE: 'OFFLINE',
  SETTINGS: 'SETTINGS'
}

export const DiveSiteTabs = {
  OVERVIEW: 'OVERVIEW',
  REVIEWS: 'REVIEWS',
  PICTURES: 'PICTURES',
  LOCATION: 'LOCATION',
  LIVEABOARDS: 'LIVEABOARDS',
  DIVE_SHOPS: 'DIVE_SHOPS'
}

/*
 * action creators
 */


export function setSearchTab(tab) {
  return { type: SET_SEARCH_TAB, tab }
}

export function setShopTab(tab) {
  return { type: SET_SHOP_TAB, tab }
}

export function setAccountTab(tab) {
  return { type: SET_ACCOUNT_TAB, tab }
}

export function setDiveSiteTab(tab) {
  return { type: SET_DIVE_SITE_TAB, tab }
}