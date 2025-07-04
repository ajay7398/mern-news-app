import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: { 
    value: "", // Default to "all" news
  },
  reducers: {
    // Updates the selected category
    setCategory: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setCategory} = categorySlice.actions;
export default categorySlice.reducer;