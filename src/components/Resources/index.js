import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';

import resources from '../../data/resources.json';

export default class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = resources;

    this.toggleVisible = this.toggleVisible.bind(this);
  };

  componentWillMount() {
    Object.keys(this.state).forEach(key => {
        if (this.state[key].gist) {
          fetch(this.state[key].url, {'Content-Type': 'text/html'})
            .then(response => response.text())
            .then(response => {
              let updated     = Object.assign({}, this.state[key]);
              updated.visible = false;
              updated.content = ReactMarkdown({
                source:    response,
                className: 'gist'
              });
              this.setState({
                [key]: updated
              });
            });
        }
      }
    );
  }

  toggleVisible(key) {
    let node     = Object.assign({}, this.state[key]);
    node.visible = !node.visible;
    this.setState({
      [key]: node
    });
  }

  resource() {
    return Object.keys(this.state).map(key => {
        if (this.state[key].gist) {
          return (
            <article className="resource" key={key}>
              <h4>{this.state[key].title}</h4>
              <p>
                {this.state[key].description}
                <button className="btn btn--link btn--small" onClick={() => this.toggleVisible(key)}>
                  {(this.state[key].visible ? '(Show less...)' : '(Show more...)')}
                </button>
              </p>
              <section className={'resource__gist ' + (this.state[key].visible ? '' : 'resource__gist--hidden')}>
                {this.state[key].content ? this.state[key].content : ''}
              </section>
            </article>
          );
        } else return false;
      }
    );
  }

  render() {
    return (
      <article className="resources">
        <h1>Useful resources</h1>
        {this.resource()}
      </article>
    );
  }
}
