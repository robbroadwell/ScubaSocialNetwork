export const getDiveSitesState = store => store.diveSites;
export const getSelectedDiveSiteState = store => store.selectedDiveSite;

export const getDiveSites = store =>
    getDiveSitesState(store);
export const getSelectedDiveSite = store =>
    getSelectedDiveSiteState(store);