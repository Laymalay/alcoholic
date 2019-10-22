import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './cocktail-list.css';

class CocktailList extends Component {
  render() {
    const { cocktails } = this.props;

    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: cocktails.length
      }], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 2,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      prePageTitle: 'Go to previous', // Previous page button title
      nextPageTitle: 'Go to next', // Next page button title
      firstPageTitle: 'Go to first', // First page button title
      lastPageTitle: 'Go to Last', // Last page button title
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      keepSizePerPageState: true, //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      onRowClick: ({ idDrink }) => {
        this.props.onCocktailSelected(idDrink);
      },
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    };
    const imageFormatter = (cell, row) => {
      return `<img src=${cell} border=3 height=130 width=130/>`;
    }
   
    return (
      <div>
        <BootstrapTable data={cocktails} pagination striped={false} hover options={options}>
          <TableHeaderColumn dataField='strDrinkThumb' dataFormat={imageFormatter} width='150'></TableHeaderColumn>
          <TableHeaderColumn isKey dataField='strDrink'>Cocktail Name</TableHeaderColumn>
        </BootstrapTable>
      </div>);
  }
}

export default CocktailList;
