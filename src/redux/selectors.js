export const getDiveSitesState = store => store.diveSites;
export const getSelectedDiveSiteState = store => store.selectedDiveSite;
export const getUserState = store => store.user;

export const getDiveSites = store => getDiveSitesState(store);
export const getSelectedDiveSite = store => getSelectedDiveSiteState(store);
export const getUser = store => getUserState(store);