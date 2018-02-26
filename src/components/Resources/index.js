import React, {Component} from 'react';

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
        items: []
      },
      questions:  {
        items: []
      }
    };
  };

  componentWillMount() {
    fetch(favoritesUrl)
      .then(response => response.json())
      .then(response => this.setState({
        favorites: response
      }));
    fetch(questionsUrl)
      .then(response => response.json())
      .then(response => this.setState({
        questions: response
      }));
  };

  static decodeHtmlEntity(entity) {
    const txt     = document.createElement('textarea');
    txt.innerHTML = entity;
    return txt.value;
  }

  itemRender(items) {
    return items.map(item => {
      return (
        <section className="favorites" key={item.question_id}>
          <div className="favorites__user">
            <img src={item.owner.profile_image} alt="owner"/>
          </div>
          <div className="favorites__content">
            <a href={item.link}>{Resources.decodeHtmlEntity(item.title)}</a>
            <p className="favorites__details">
              Viewed {item.view_count.toLocaleString('de-DE')} times
              {item.is_answered ? ', answered' : ', no answer'}
            </p>
            <p className="favorites__details">
              Question score is {item.score.toLocaleString('de-DE')}
            </p>
            <p className="favorites__details">
              Tags: {
              item.tags.map((tag, index) => (
                <span key={index} className="favorites__tag">{tag}</span>
              ))}
            </p>
          </div>
        </section>
      );
    });
  }

  render() {
    return (
      <article className="resources">
        <h3>Favorites on stack overflow</h3>
        {this.itemRender(this.state.favorites.items)}
        <h3>My questions on stack overflow</h3>
        {this.itemRender(this.state.questions.items)}
      </article>
    );
  }
}
