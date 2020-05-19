import { combineReducers } from 'redux'
import {
  SET_SEARCH_TAB,
  SearchTabs,
  SET_SHOP_TAB,
  ShopTabs,
  SET_ACCOUNT_TAB,
  AccountTabs,
  SET_DIVE_SITE_TAB,
  DiveSiteTabs
} from './actions'
const { DIVE_SITES } = SearchTabs
const { DIVE_COMPUTERS } = ShopTabs
const { SETTINGS } = AccountTabs
const { OVERVIEW } = DiveSiteTabs

function searchTab(state = DIVE_SITES, action) {
  switch (action.type) {
    case SET_SEARCH_TAB:
      return action.tab
    default:
      return state
  }
}

function shopTab(state = DIVE_COMPUTERS, action) {
  switch (action.type) {
    case SET_SHOP_TAB:
      return action.tab
    default:
      return state
  }
}

function accountTab(state = SETTINGS, action) {
  switch (action.type) {
    case SET_ACCOUNT_TAB:
      return action.tab
    default:
      return state
  }
}

function diveSiteTab(state = OVERVIEW, action) {
  switch (action.type) {
    case SET_DIVE_SITE_TAB:
      return action.tab
    default:
      return state
  }
}

const scubaApp = combineReducers({
  searchTab,
  shopTab,
  accountTab,
  diveSiteTab
})

export default scubaApp