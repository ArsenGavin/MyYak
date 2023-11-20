import { CREATE_ZONE, GET_ALL_ZONES, SET_MY_ZONE, ZONE_ERROR, ZONE_LOADING } from "../actions";

const initialState = {
  zones: [],
  newZone: { name: "", bottomX: 0, bottomY: 0, topX: 0, topY: 0 },
  error: false,
  errorMessage: "",
  loading: false,
  myZone: null,
};

const zoneReducer = (state = initialState, action) => {
  switch (action.type) {
    case ZONE_LOADING:
      return { ...state, loading: true, error: false };

    case ZONE_ERROR:
      return { ...state, loading: false, error: true, errorMessage: action.payload.errorMessage };

    case CREATE_ZONE:
      return {
        ...state,
        loading: false,
        error: false,
        zones: [...state.zones, action.payload.zone],
        myZone: action.payload.myZone,
      };

    case GET_ALL_ZONES:
      return {
        ...state,
        loading: false,
        error: false,
        zones: action.payload.zones,
      };

    case SET_MY_ZONE:
      return {
        ...state,
        loading: false,
        error: false,
        myZone: action.payload.myZone,
      };

    default:
      return {
        ...state,
      };
  }
};

export default zoneReducer;
