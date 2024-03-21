// src/features/recipesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recipes: [],
    loading: false,
    error: null,
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        fetchRecipesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchRecipesSuccess(state, action) {
            state.loading = false;
            state.recipes = action.payload;
        },
        fetchRecipesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchRecipesStart,
    fetchRecipesSuccess,
    fetchRecipesFailure,
} = recipesSlice.actions;

export default recipesSlice.reducer;
