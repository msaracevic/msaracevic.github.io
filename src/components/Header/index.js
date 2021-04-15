import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header>
    <nav className="navigation">
      <ul className="navigation__content">
        <li className='navigation__link navigation__name'>
          <NavLink exact to="/">Miroslav Saračević</NavLink>
        </li>
        <li className="navigation__link">
          <NavLink exact activeClassName="navigation__active" to="/">Home</NavLink>
        </li>
        <li className="navigation__link">
          <NavLink activeClassName="navigation__active" to="/resources">Resources</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
