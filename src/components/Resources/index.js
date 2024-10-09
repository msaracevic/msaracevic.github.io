import React, {useEffect, useState} from 'react';
import ReactEmbedGist from 'react-embed-gist';
import './Resources.scss';
import {decodeHtmlEntity} from '../../helpers';

const apiVersion = '2.2';
const apiBase = 'https://api.stackexchange.com';
const userId = 3963682;
const favoritesUrl = `${apiBase}/${apiVersion}/users/${userId}/favorites?order=desc&sort=activity&site=stackoverflow`;
const questionsUrl = `${apiBase}/${apiVersion}/users/${userId}/questions?order=desc&sort=activity&site=stackoverflow`;

const StackOverflowItems = (props) => (
  !props.items ? null : props.items.map(item => (
    <div key={item.question_id} className="so-item">
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="so-item__link">
        {decodeHtmlEntity(item.title)}
      </a>
      <div className="so-item__user">
        <img src={item.owner.profile_image} alt="owner"/>
      </div>
      <div className="so-item__content">
        <p className="so-item__details">
          Viewed {item.view_count.toLocaleString('de-DE')} times,&nbsp;
          <span className="text--bold">{item.is_answered ? 'answered' : 'no answer'}</span>
        </p>
        <p className="so-item__details">
          Question score is {item.score.toLocaleString('de-DE')}
        </p>
        <p className="so-item__details">
          {item.tags.map((tag, index) => index < 3 ? <span key={tag} className="so-item__tag">{tag}</span> : null)}
        </p>
      </div>
    </div>
  ))
);

const Resources = () => {
  const [isMounted, setIsMounted] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    if (isMounted) {
      fetch(favoritesUrl).then(response => response.json()).then(response => setFavorites(response));
      fetch(questionsUrl).then(response => response.json()).then(response => setQuestions(response));
    } else setIsMounted(false);
  }, [setIsMounted]);

  return (
    <React.Fragment>
      <div className="white">
        <article className="resources">
          <div className="resources__item">
            <ReactEmbedGist gist="msaracevic/7a315f610c11d39aeea55061d3b9bf05" wrapperClass="gist"/>
          </div>
          <div className="resources__item">
            <ReactEmbedGist gist="msaracevic/5d757e2fc72482a9a4a439969500c2eb" wrapperClass="gist"/>
            <ReactEmbedGist gist="msaracevic/5d757e2fc72482a9a4a439969500c2eb" wrapperClass="gist"/>
          </div>
          <div className="resources__item resources__item--so">
            <h2 className="title">Stack Overflow Questions</h2>
            <StackOverflowItems items={favorites.items}/>
            <StackOverflowItems items={questions.items}/>
          </div>
        </article>
      </div>
    </React.Fragment>
  );
};

export default Resources;
