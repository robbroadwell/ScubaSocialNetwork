export const getDiveSitesState = store => store.diveSites;
export const getSelectedDiveSiteState = store => store.selectedDiveSite;
export const getUserState = store => store.user;
export const getMapCenterState = store => store.mapCenter;
export const getMapRectState = store => store.mapRect;
export const getAddDiveSiteModeState = store => store.addDiveSiteMode;

export const getDiveSites = store => getDiveSitesState(store);
export const getSelectedDiveSite = store => getSelectedDiveSiteState(store);
export const getUser = store => getUserState(store);
export const getMapCenter = store => getMapCenterState(store);
export const getMapRect = store => getMapRectState(store);
export const getAddDiveSiteMode = store => getAddDiveSiteModeState(store);
