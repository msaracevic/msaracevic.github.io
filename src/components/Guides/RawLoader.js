import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';

/*
 * This is raw loader from json object, it will loop through object and
 * request gist from github in raw form. After that it will be passed to
 * react-markdown plugin to convert from .MD to valid HMTL structure.
 * Currently this is not being used, but is here as an example how to do it
 */

export default class RawLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'macOs': {
        'url':         'https://gist.githubusercontent.com/msaracevic/7a315f610c11d39aeea55061d3b9bf05/raw',
        'title':       'MacOS dev enviroment setup',
        'description': 'Quick setup guide for new macOS which includes node, postgres, ssh and few quality of life improvements',
        'gist':        true
      },
      'bash':  {
        'url':         'https://gist.githubusercontent.com/msaracevic/5d757e2fc72482a9a4a439969500c2eb/raw',
        'title':       'Bash profile',
        'description': 'Basic bash functions and aliases',
        'gist':        true
      }
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
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
        <section className={'guide__gist-raw ' + (item.visible ? '' : 'guide__gist-raw--hidden')}>
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
