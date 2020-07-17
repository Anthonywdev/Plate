import { combineReducers } from "redux";

import user from "./users_reducer";
import chats from "./chat_reducer";

const rootReducer = combineReducers({
  user,
  chats,
});

export default rootReducer;
