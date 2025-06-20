import { createSlice } from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'article',
  initialState: { 
    value: "", // Default to "all" news
  },
  reducers: {
    // Updates the selected category
    setArticles: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setArticles} = articleSlice.actions;
export default articleSlice.reducer;