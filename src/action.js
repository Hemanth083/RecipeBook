// actions.js

// Action type constants
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

// Action creator function
export const setSearchQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    payload: query,
});
