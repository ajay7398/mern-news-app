import { createSlice } from '@reduxjs/toolkit'

const pageSlice = createSlice({
  name: 'paging',
  initialState: { value: 1 },
  reducers: {
    IncrementPge: (state) => {
      state.value += 1;  // ✅ mutate using Immer
    },
    DecrementPage: (state) => {
      state.value -= 1;  // ✅ same here
    },
  }
});

export const { IncrementPge, DecrementPage } = pageSlice.actions;
export default pageSlice.reducer;
