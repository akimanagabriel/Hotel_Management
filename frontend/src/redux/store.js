import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { allUserReducer } from "./allUsers";
import { themeReducer } from "./themeSlice";

const store = configureStore({
   reducer: {
      auth: userReducer,
      users: allUserReducer,
      theme: themeReducer,
   },
});

export default store;
