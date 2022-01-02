import './App.css';
import { Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Recipe from './components/recipe';
import RecipeList from './components/recipeList';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/recipes", 
        {
            method: "get",
            mode: "cors" 
        }
    )
    .then(res => res.json())
    .then(res => setRecipes(res))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <header>
        <Link to="/">Home</Link>
      </header>
      <div className='content'>
        <Route exact path ="/" render={props => (
          <RecipeList recipes={recipes} />
        )} />
        <Route 
          path="/ingredients/:recipeId" 
          render={props => (
            <Recipe recipeId={props.match.params.recipeId} recipes={recipes}/>
          )}
        />
      </div>
    </div>
  );
}

export default App;
