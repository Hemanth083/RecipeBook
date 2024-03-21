import React from 'react';
import Home from "./pages/Home";
import Recipes from "./pages/recipes";
import RecipeDetails from './pages/recipeDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path="/recipe/:id" component={RecipeDetails} /> {/* Route for recipe details */}
      </Routes>
    </BrowserRouter >
  );
};

export default App;
