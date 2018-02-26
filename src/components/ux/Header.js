import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state      = {
      visibleMobile: false
    };
    this.showMobile = this.showMobile.bind(this);
  }

  showMobile() {
    this.setState({
      visibleMobile: !this.state.visibleMobile
    });
  }

  render() {
    return (
      <header className="page-content-header">
        <nav className={'navigation ' + (this.state.visibleMobile ? 'navigation--visible' : '')}>
          <span className="navigation__mobile" onClick={this.showMobile}></span>
          <div className="navigation__title"><a href="/">Miroslav Saračević</a>
          </div>
          <ul className="navigation__content">
            <li className="navigation__link">
              <Link to="/guides" onClick={this.showMobile}>Guides</Link>
            </li>
            <li className="navigation__link">
              <Link to="/resources" onClick={this.showMobile}>Resources</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
};
