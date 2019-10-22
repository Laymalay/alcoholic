import React, { Component } from 'react';
import './cocktail-filter-panel.css';
import CocktailService from '../../services/cocktail-service';
import CustomDropdownInput from 'react-custom-dropdown-input';
import { Dropdown } from 'react-bootstrap';

class CocktailFilterPanel extends Component {
  state = {
    alcoholicFilters: [],
    categoryFilters: [],
    glassFilters: [],
    filter: {
      alcohol: 'Alcoholic',
      category: null,
      glass: null
    },
    show: 'alcohol',
  }

  constructor() {
    super();
    this.cocktailService = new CocktailService();
    this.loadFilters();
  }

  loadFilters = () => {
    this.cocktailService.getCocktailsFilters().then(
      res => {
        res = res.drinks.map(({ strAlcoholic }) => strAlcoholic).filter((_) => _ != null);
        this.setState({ alcoholicFilters: res })
      });
    this.cocktailService.getCocktailsFilters('g').then(
      res => this.setState({ glassFilters: res.drinks.map(({ strGlass }) => strGlass) })
    );
    this.cocktailService.getCocktailsFilters('c').then(
      res => this.setState({ categoryFilters: res.drinks.map(({ strCategory }) => strCategory) })
    );
  }
  // TODO 
  handleSelectedGlass = ({ id }) => {
    const filter = { ...this.state.filter };
    filter.glass = id;
    filter.alcohol = null;
    filter.category = null;
    this.setState({ filter });
  }

  handleSelectedCategory = ({ id }) => {
    const filter = { ...this.state.filter };
    filter.category = id;
    filter.glass = null;
    filter.alcohol = null;
    this.setState({ filter });
  }

  handleOptionChange = (changeEvent) => {
    const filter = { ...this.state.filter };
    filter.alcohol = changeEvent.target.value;
    filter.glass = null;
    filter.category = null;
    this.setState({ filter });
  };

  //default list
  componentDidMount() {
    this.props.onFilterChange(this.state.filter);
  }

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    const { filter } = this.state;
    this.props.onFilterChange(filter);
  };

  changeFilter = (el) => {
    const value = el.target.innerHTML;
    this.setState({ show: value });
  }

  ShowFilter = () => {
    let { show, alcoholicFilters, glassFilters, categoryFilters } = this.state;

    glassFilters = glassFilters.map(item => {
      return { label: item.toUpperCase(), id: item }
    })

    categoryFilters = categoryFilters.map(item => {
      return { label: item.toUpperCase(), id: item }
    })

    switch (show) {
      case 'Glass':
        return (<div className="filter">
          <CustomDropdownInput values={glassFilters}
            handleSelected={this.handleSelectedGlass} />
        </div>);
      case 'Category':
        return (
          <div className="filter">
            <CustomDropdownInput values={categoryFilters}
              handleSelected={this.handleSelectedCategory} />
          </div>);
      default:
        return this.radioFilter(alcoholicFilters);
    }
  }
  radioFilter(alcoholicFilters) {
    return (
      <div className="filter">
        <div>
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value={alcoholicFilters[0]}
                checked={this.state.filter.alcohol === alcoholicFilters[0]}
                onChange={this.handleOptionChange}
                className="form-check-input"
              />
              {alcoholicFilters[0]}
            </label>
          </div>
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value={alcoholicFilters[1]}
                checked={this.state.filter.alcohol === alcoholicFilters[1]}
                onChange={this.handleOptionChange}
                className="form-check-input"
              />
              {alcoholicFilters[1]}
            </label>
          </div>
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value={alcoholicFilters[2]}
                onChange={this.handleOptionChange}
                checked={this.state.filter.alcohol === alcoholicFilters[2]}
                className="form-check-input"
              />
              {alcoholicFilters[2]}
            </label>
          </div>
        </div>
      </div>

    )
  }
  render() {
    const { show } = this.state;

    return (
      <div className="filter-panel">
        <form onSubmit={this.handleFormSubmit}>
          <div className="d-flex justify-content-between filter">
            <Dropdown>
              <Dropdown.Toggle variant="secondary">
                Filter by
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.changeFilter}>Glass</Dropdown.Item>
                <Dropdown.Item onClick={this.changeFilter}>Category</Dropdown.Item>
                <Dropdown.Item onClick={this.changeFilter}>Alcohol</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <h3>{show}</h3>
          </div>

          <this.ShowFilter />
          <div className="form-group">
              <button className="btn btn-outline-secondary btn-lg btn-block" type="submit">
                Filter
            </button>
            </div>
        </form>
      </div>
    );
  }
}

export default CocktailFilterPanel;
