import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state      = {
      visibleMobile: false
    };
    this.showMobile = this.showMobile.bind(this);
    this.closeMobile = this.closeMobile.bind(this);
  }

  showMobile() {
    this.setState({
      visibleMobile: !this.state.visibleMobile
    });
  }

  closeMobile() {
    this.setState({
      visibleMobile: false
    });
  }
  
  render() {
    return (
      <header className="page-content-header">
        <nav className={'navigation ' + (this.state.visibleMobile ? 'navigation--visible' : '')}>
          <span className="navigation__mobile" onClick={this.showMobile}></span>
          <div className="navigation__title"><NavLink to="/">msaracevic.github.io</NavLink></div>
          <ul className="navigation__content">
            <li className="navigation__link">
              <NavLink exact activeClassName="navigation__link-active" to="/Guides" onClick={this.closeMobile}>Guides</NavLink>
            </li>
            <li className="navigation__link">
              <NavLink activeClassName="navigation__link-active" to="/resources" onClick={this.closeMobile}>Resources</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
};
