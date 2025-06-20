import { configureStore } from "@reduxjs/toolkit";
import pageNumber from '../features/paging/pageSlice'
import categoryReducer from '../features/paging/categorySlice'
import articleReducer from '../features/articles/articleSlice'
import searchReducer from '../features/filtering/filterSlice'
import userReducer from '../features/user/userSlice'
const store=configureStore({
    reducer:{
        paging:pageNumber,
        category:categoryReducer,
        article:articleReducer,
        search:searchReducer,
        username:userReducer
    }
})

export default store;