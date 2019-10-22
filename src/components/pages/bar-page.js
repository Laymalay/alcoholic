import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CocktailFilterPanel from '../cocktail-filter-panel';
import CocktailsList from '../cocktail-list';
import CocktailService from '../../services/cocktail-service';
import './bar-page.css';
import Cocktail from '../cocktail/cocktail';

class BarPage extends Component {
    cocktailoService = new CocktailService();
    state = {
        cocktails: [],
        cocktail_id: null,
    }

    onFilterChange = (filter) => {
        this.cocktailoService.getCocktails(filter).then(
            res => this.setState({ cocktails: res })
        )
    }
    onCocktailSelected = (cocktail_id) => {
        this.setState({ cocktail_id })
    }

    render() {
        const { cocktails } = this.state;
        return (
            <div className="row">
                <div className="col-sm-2">
                    <CocktailFilterPanel onFilterChange={this.onFilterChange} />
                </div>
                <div className="col-sm-4">
                    <CocktailsList cocktails={cocktails} onCocktailSelected={this.onCocktailSelected} />
                </div>
                <div className="col-sm-6">
                    {/* <CocktailGrid /> */}
                    <Cocktail cocktail_id={this.state.cocktail_id} />
                </div>

            </div>
        );
    }

};

export default withRouter(BarPage);
