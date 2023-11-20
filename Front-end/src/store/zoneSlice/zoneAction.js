import { CREATE_ZONE, GET_ALL_ZONES, SET_MY_ZONE, ZONE_ERROR, ZONE_LOADING } from "../actions";

export const zoneLoadingAction = () => ({
  type: ZONE_LOADING,
});

export const zoneErrorAction = (errorMessage) => ({
  type: ZONE_ERROR,
  payload: { errorMessage },
});

export const getAllZonesAction = (zones) => ({
  type: GET_ALL_ZONES,
  payload: { zones },
});

export const createZoneAction = (zone) => ({
  type: CREATE_ZONE,
  payload: { zone },
});

export const setMyZoneAction = (myZone) => ({
  type: SET_MY_ZONE,
  payload: { myZone },
});
