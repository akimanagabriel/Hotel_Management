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
      deleteUser: (state, action) => {
         state.data = state.data.filter((user) => user.id !== action.payload);
      },
   },
});

export const allUserReducer = allUsersSlice.reducer;
export const { setUsers, appendUser,deleteUser } = allUsersSlice.actions;
