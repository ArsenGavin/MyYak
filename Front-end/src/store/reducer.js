import { combineReducers } from "redux";
import userReducer from "./userSlice/userReducer";
import discussionReducer from "./discussionSlice/discussionReducer";
import zoneReducer from "./zoneSlice/zoneReducer";
import messageReducer from "./messageSlice/messageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  discussion: discussionReducer,
  zone: zoneReducer,
  message: messageReducer,
});

export default rootReducer;
