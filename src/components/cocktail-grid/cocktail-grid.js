import React, { Component } from 'react';
import CocktailService from '../../services/cocktail-service';
import FbImageLibrary from 'react-fb-image-grid';
import './cocktail-grid.css'

class CocktailGrid extends Component {
  cocktailService = new CocktailService();
  grid = React.createRef();
  
  handleImageClick = ({src, index}) => {
    console.log(src, index)
    console.log(this.state.cocktails[index+1])
  }

  state = {
    cocktails: []
  };

  constructor() {
    super();
    this.loadCocktails();
  }
  loadCocktails() {
    this.cocktailService
      .getCocktails()
      .then(this.onCocktailLoaded);
  }

  onCocktailLoaded = (cocktails) => {
    this.setState({ cocktails });
  };

  getImageData = () => {
    return this.state.cocktails.map(({ strDrinkThumb }) => strDrinkThumb).slice(1, 10);
  }
  render() {
    return (
      <div>
        <FbImageLibrary 
          renderOverlay={() => <span>Show description</span>}
          onClickEach={this.handleImageClick}
          images={this.getImageData()} />
      </div>);
  }
}

export default CocktailGrid;
