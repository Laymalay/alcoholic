import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Cocktail from '../cocktail/cocktail';
import CocktailService from '../../services/cocktail-service';

export default class CocktailPage extends Component {
  state = {
    cocktail: null
  }
  cocktailService = new CocktailService();

  loadRandomCocktail = () => {
    this.cocktailService.getRandomCocktail()
      .then((cocktail) => this.setState({ cocktail: cocktail[0] }))
  }

  ShowRandomCocktail = () => {
    const { cocktail } = this.state;
    console.log(cocktail)
    if (!cocktail) {
      return <button onClick={this.loadRandomCocktail}>Click me!</button>
    }

    return (<div>
      <button onClick={this.loadRandomCocktail}>Click me!</button>
      <Cocktail cocktail={cocktail} />
    </div>
    )
  }


  render() {
    return (<div>
      <div className="row">
        <div className="col-sm-3">
        </div>
        <div className="col-sm-6">
          {this.ShowRandomCocktail()}
        </div>
        <div className="col-sm-3">
        </div>
      </div>
    </div >);
  }
};

