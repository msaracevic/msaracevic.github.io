import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="page-content-footer">
        Copyright © {new Date().getFullYear()} Miroslav Saračević
      </footer>
    );
  }
}
