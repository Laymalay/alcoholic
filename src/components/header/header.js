import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">Cocktail Bar</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to='/ingredients'>Ingredients</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/cocktail'>Random</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
