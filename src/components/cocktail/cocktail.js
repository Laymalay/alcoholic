import React, { Component } from 'react';
import CocktailService from '../../services/cocktail-service';
import './cocktail.css';

export default class Cocktail extends Component {
  state = {
    cocktail: null,
  };
  cocktailService = new CocktailService();

  componentDidMount() {
    this.updateCocktail();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updateCocktail()
    }
  }

  updateCocktail = () => {
    const { cocktail_id, cocktail } = this.props;

    if (cocktail) {
      console.log(cocktail)
      this.setState({ cocktail });
      return;
    }

    if (!cocktail_id) {
      return;
    }

    this.cocktailService.getCocktail(cocktail_id)
      .then((res) => this.setState({ cocktail: res[0] }));
  }


  render() {
    if (!this.state.cocktail) {
      return <span></span>
    }
    const { cocktail } = this.state;

    const values = Object.values(cocktail);
    const ingredients = values.slice(21, 35).filter((_) => _ !== '');
    const measures = values.slice(36, 36 + ingredients.length);


    const recipe = ingredients.map((ingredient, i) => {
      return (
        <li key={ingredient} className="list-group-item">{measures[i]} {ingredient}</li>
      )
    })
    return (
      <div className="card">
        <h3 className="card-header">{cocktail.strDrink}</h3>
        <div className="d-flex">
          <img height='380px' width='380px' src={cocktail.strDrinkThumb} alt="Cocktail" />
          <div>
            <h5 className="card-subtitle desc">{cocktail.strInstructions}</h5>
            <hr />
            <h6>Glass: {cocktail.strGlass}</h6>
            <h6>Category: {cocktail.strCategory}</h6>
            <h6>Alcoholic: {cocktail.strAlcoholic}</h6>

          </div>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item"><h3>Ingredients:</h3></li>
          {recipe}
        </ul>

      </div>
    )
  }

}


