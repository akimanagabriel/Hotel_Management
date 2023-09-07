import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import {allUserReducer} from "./allUsers";

const store = configureStore({
   reducer: {
      auth: userReducer,
      users: allUserReducer,
   },
});

export default store;
