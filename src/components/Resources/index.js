import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';

const initalState = {
  macOs: {
    url:         'https://gist.githubusercontent.com/msaracevic/7a315f610c11d39aeea55061d3b9bf05/raw',
    title:       'MacOS dev enviroment setup',
    description: 'Quick setup guide for new macOS which includes node, postgres, ssh and few quality of life improvements'
  },
  bash:  {
    url:         'https://gist.githubusercontent.com/msaracevic/5d757e2fc72482a9a4a439969500c2eb/raw',
    title:       'Bash',
    description: 'Basic bash functions and aliases'
  }
  // git:  {
  //   url:         'https:/gist.githubusercontent.com/barbara-rogar/19d07195f60826db9ca0af8b8408f199/raw',
  //   title:       'Git cheat sheet',
  //   description: 'All things related to git'
  // }
};

Object.keys(initalState).forEach(key => {
  initalState[key].content = false;
  initalState[key].visible = false;
});

export default class Resources extends Component {
  constructor(props) {
    super(props);
    this.state         = initalState;
    this.toggleVisible = this.toggleVisible.bind(this);
  };

  componentWillMount() {
    Object.keys(this.state).forEach(key => {
      fetch(this.state[key].url, {'Content-Type': 'text/html'})
        .then(response => response.text())
        .then(response => {
          let updated     = Object.assign({}, this.state[key]);
          updated.content = ReactMarkdown({
            source:    response,
            className: 'gist'
          });
          this.setState({
            [key]: updated
          });
        });
    });
  }

  toggleVisible(key) {
    let node     = Object.assign({}, this.state[key]);
    node.visible = !node.visible;
    this.setState({
      [key]: node
    });
  }
  
  resource () {
    return Object.keys(initalState).map(key =>
      (
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
      )
    );
  }

  render() {
    return (
      <article className="resources">
        <h1>Useful resources</h1>
        {this.resource()}
      </article>
    )
  }
}
