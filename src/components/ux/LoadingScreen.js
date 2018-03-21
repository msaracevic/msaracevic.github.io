import React, {Component} from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div className={`loading-screen ${this.props.className}`}>
        <p className="loading-screen__message">
          Loading content, please wait
        </p>
      </div>
    );
  }
}
