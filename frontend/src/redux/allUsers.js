const { createSlice } = require("@reduxjs/toolkit");

const allUsersSlice = createSlice({
   name: "allUsers",
   initialState: { data: [] },
   reducers: {
      setUsers: (state, action) => {
         state.data = action.payload;
      },
      appendUser: (state, action) => {
         state.data.unshift(action.payload);
      },
   },
});

export const allUserReducer = allUsersSlice.reducer;
export const { setUsers, appendUser } = allUsersSlice.actions;
