

import { configureStore } from '@reduxjs/toolkit';
import recipesReduce from "../src/store/Slices/recipesSlice"

export default configureStore({
    reducer: {
        recipes: recipesReduce,
    },
});
