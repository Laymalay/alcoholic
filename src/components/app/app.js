import React, { Component } from 'react';

import Header from '../header';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CocktailPage, IngredientsPage, BarPage } from '../pages';
import './app.css';

export default class App extends Component {
    render() {        
        return (
            <Router>
                <Header />
                <Route path="/" component={BarPage} exact />
                <Route path="/cocktail/" component={CocktailPage} />
                <Route path="/ingredients/" component={IngredientsPage} />
            </Router>
        );
    }
};
