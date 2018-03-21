import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';

import guides from '../../data/guides.json';

export default class Guides extends Component {
  constructor(props) {
    super(props);
    this.state = guides;

    this.toggleVisibility       = this.toggleVisibility.bind(this);
    this.toggleVisibilityButton = this.toggleVisibilityButton.bind(this);
  };

  fillGistResponseData(key, response) {
    let updated = Object.assign({}, this.state[key]);

    updated.visible = false;
    updated.content = ReactMarkdown({
      source:    response,
      className: 'gist'
    });
    this.setState({[key]: updated});
  }

  componentWillMount() {
    Object.keys(this.state).forEach(key => {
      if (this.state[key].gist) {
        fetch(this.state[key].url, {'Content-Type': 'text/html'})
          .then(response => response.text())
          .then(response => this.fillGistResponseData(key, response));
      }
    });
  }

  toggleVisibility(key) {
    let node = Object.assign({}, this.state[key]);

    node.visible = !node.visible;
    this.setState({[key]: node});
  }

  toggleVisibilityButton(key, visible) {
    return (
      <button className="btn btn--link btn--small" onClick={() => this.toggleVisibility(key)}>
        {visible ? '(Show less...)' : '(Show more...)'}
      </button>
    );
  }

  gistResource(key) {
    const item = this.state[key];
    return (
      <article className="guide" key={key}>
        <h4>{item.title}</h4>
        <p>
          {item.description}
          {this.toggleVisibilityButton(key, item.visible)}
        </p>
        <section className={'guide__gist ' + (item.visible ? '' : 'guide__gist--hidden')}>
          {item.content ? item.content : ''}
        </section>
      </article>
    );
  }

  render() {
    return (
      <article className="guides">
        {Object.keys(this.state).map(key => {
          if (this.state[key].gist) return this.gistResource(key);
          else return (<span>This type of guide is not defined</span>);
        })}
      </article>
    );
  }
}
