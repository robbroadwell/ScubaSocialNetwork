export const getDiveSitesState = store => store.diveSites;
export const getSelectedDiveSiteState = store => store.selectedDiveSite;
export const getUserState = store => store.user;
export const getMapCoordinatesState = store => store.mapCoordinates;
export const getAddDiveSiteModeState = store => store.addDiveSiteMode;

export const getDiveSites = store => getDiveSitesState(store);
export const getSelectedDiveSite = store => getSelectedDiveSiteState(store);
export const getUser = store => getUserState(store);
export const getMapCoordinates = store => getMapCoordinatesState(store);
export const getAddDiveSiteMode = store => getAddDiveSiteModeState(store);