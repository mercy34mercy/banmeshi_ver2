import './App.css';
import TopBar from './TopBar';
import SearchBar from './SearchBar';
import RecipeBox from './RecipeBox';
import { Fetch } from './FetchAPI';
import { Load } from './Loading';
import React, { useEffect } from 'react'


type recipedata = {
  foodImageUrl: String,
  mediumImageUrl: String,
  recipeCost: String,
  recipeTitle: String,
  recipeUrl: String,
  smallImageUrl: String,
  threeRecipeMaterial: String
}

type props = {
  search:any,
  setLoading:any
}

export const App = (props:props) => {

  return (
    <div className="App">
      <div>
        <TopBar></TopBar>
      </div>
      <div className='center'>
        <SearchBar search={props.search} setLoading={props.setLoading}></SearchBar>
      </div>
    </div>

  );
}

