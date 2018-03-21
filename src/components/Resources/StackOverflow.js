import React, {Component} from 'react';
import LoadingScreen from '../ux/LoadingScreen';

export default class StackOverflow extends Component {
  static decodeHtmlEntity(entity) {
    const txt     = document.createElement('textarea');
    txt.innerHTML = entity;
    return txt.value;
  }

  itemRender(items) {
    if (items.length === 0) return (<LoadingScreen className="loading-screen--small"/>);
    return items.map(item => (
        <section className="so-item" key={item.question_id}>
          <div className="so-item__user">
            <img src={item.owner.profile_image} alt="owner"/>
          </div>
          <div className="so-item__content">
            <a href={item.link}>{StackOverflow.decodeHtmlEntity(item.title)}</a>
            <p className="so-item__details">
              Viewed {item.view_count.toLocaleString('de-DE')} times
              {item.is_answered ? ', answered' : ', no answer'}
            </p>
            <p className="so-item__details">
              Question score is {item.score.toLocaleString('de-DE')}
            </p>
            <p className="so-item__details">
              Tags: {
              item.tags.map((tag, index) => (
                <span key={index} className="so-item__tag">{tag}</span>
              ))}
            </p>
          </div>
        </section>
      )
    );
  }

  render() {
    return (
      <section className={this.props.className}>
        <h2>{this.props.title}</h2>
        {this.itemRender(this.props.items)}
      </section>
    );
  }
}
