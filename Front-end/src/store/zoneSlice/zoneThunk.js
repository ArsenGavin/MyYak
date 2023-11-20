import { createZoneAction, getAllZonesAction, setMyZoneAction, zoneErrorAction, zoneLoadingAction } from "./zoneAction";
import { createZoneService, getAllZonesService } from "../../services/zoneService";

export const getAllZones = () => (dispatch) => {
  dispatch(zoneLoadingAction());
  return getAllZonesService().then(
    (res) => {
      dispatch(getAllZonesAction(res.data));
      return Promise.resolve();
    },
    (err) => {
      dispatch(zoneErrorAction(err.response.data));
      return Promise.reject(err.response.data);
    }
  );
};

export const createZone = (zone) => (dispatch) => {
  dispatch(zoneLoadingAction());
  return createZoneService(zone).then(
    (res) => {
      dispatch(createZoneAction(res.data));
      return Promise.resolve();
    },
    (err) => {
      dispatch(zoneErrorAction(err.response.data));
      return Promise.reject(err.response.data);
    }
  );
};

export const setMyZone = (myZone) => (dispatch) => {
  dispatch(zoneLoadingAction());
  try {
    dispatch(setMyZoneAction(myZone));
    return Promise.resolve();
  } catch (err) {
    dispatch(zoneErrorAction(err.toString()));
    return Promise.reject(err.toString());
  }
};
