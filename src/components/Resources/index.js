import React, {Component} from 'react';
import StackOverflow from './StackOverflow';

const apiVersion   = '2.2',
      apiBase      = 'https://api.stackexchange.com',
      userId       = 3963682,
      favoritesUrl = `${apiBase}/${apiVersion}/users/${userId}/favorites?order=desc&sort=activity&site=stackoverflow`,
      questionsUrl = `${apiBase}/${apiVersion}/users/${userId}/questions?order=desc&sort=activity&site=stackoverflow`;

export default class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: {
        url:   favoritesUrl,
        items: []
      },
      questions: {
        url:   questionsUrl,
        items: []
      }
    };
  };

  componentWillMount() {
    Object.keys(this.state).forEach(key => {
      fetch(this.state[key].url)
        .then(response => response.json())
        .then(response => this.setState({[key]: response}));
    });
  };

  render() {
    return (
      <article className="resources">
        <StackOverflow className="resource" title="Favorites on stack overflow" items={this.state.favorites.items}/>
        <StackOverflow className="resource" title="Questions on stack overflow" items={this.state.questions.items}/>
      </article>
    );
  }
}
