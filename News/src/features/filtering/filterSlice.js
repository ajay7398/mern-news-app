import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'search',
  initialState: { 
    value: "", // Default to "all" news
  },
  reducers: {
    // Updates the selected category
    setValue: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setValue} = filterSlice.actions;
export default filterSlice.reducer;