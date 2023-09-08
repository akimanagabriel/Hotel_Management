const { createSlice } = require("@reduxjs/toolkit");

const themeSlice = createSlice({
   name: "colorMode",
   initialState: { mode: window.localStorage.getItem("colorMode") || "light" },
   reducers: {
      changeMode: (state) => {
         const newMode = state.mode === "dark" ? "light" : "dark";
         state.mode = newMode;
         window.localStorage.setItem("colorMode", newMode);
      },
   },
});

export const themeReducer = themeSlice.reducer;
export const { changeMode } = themeSlice.actions;
