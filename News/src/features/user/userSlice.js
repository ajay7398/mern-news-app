import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'username',
  initialState: { 
    value: "", // Default to "all" news
  },
  reducers: {
    // Updates the selected category
    setUser: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setUser} = userSlice.actions;
export default userSlice.reducer;