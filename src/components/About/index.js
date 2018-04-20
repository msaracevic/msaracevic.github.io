import React, {Component} from 'react';
import work from '../../data/work.json';
import {duration} from '../../helpers/index';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = work;
  };

  workItem(type) {
    return this.state[type].map((item, index) => (
      <section key={index} className="work__item">
        <div className="work__icon">
          <img src={item.image} alt={item.company}/>
        </div>
        <div className="work__info">
          <h5 className="work__title">{item.position}</h5>
          <h6 className="work__company">{item.company}, {item.location}</h6>
          <p className="work__duration">
            From {item.start} to {item.end} ({duration(item.start, item.end)})
          </p>
          <p>{item.responsibilities}</p>
          <p className="work__tech">Tech stack: {item.technologies}</p>
        </div>
      </section>
    ));
  }

  personalProjectItem(type) {
    return this.state[type].map((item, index) => (
      <section key={index} className="project__item">
        <h5 className="work__title">{item.project}</h5>
        <p className="project__link">
         <a href={item.url} target="_blank">Link to project</a> <span className="disclaimer">(opens in new tab)</span>
        </p>
        <p>{item.description}</p>
        <p className="work__tech">Tech stack: {item.technologies}</p>
      </section>
    ));
  }

  availability() {
    const available = this.state.available;
    return (
      <p className="bold">
        <span>Currently </span>
        <span className={`personal__status personal__status--${available ? 'active' : 'inactive'}`}>
         {available ? 'looking for offers' : 'not looking for offers'}
        </span>
      </p>
    );
  }

  contact() {
    return this.state.contact.map(item => (
      <a href={item.url} key={item.url} className="personal__contact">
        <span className="personal__contact-image">
          <img src={item.image} alt={item.label}/>
        </span>
        <span className="personal__contact-label">{item.label}</span>
      </a>
    ));
  }

  personal() {
    return (
      <article className="personal home__personal">
        <img className="personal__image" src="/images/personal.jpg" alt="personal"/>
        <h1 className="personal__name">Miroslav Saračević</h1>
        <p className="personal__tagline">
          I am web developer and I've been working in Berlin since 2014.
          During that time I've worked in several companies and was exposed to
          several technologies. If you wish to contact me,please add me on
          LinkedIn.
        </p>
        {this.availability()}
        {this.contact()}
      </article>
    );
  }

  work() {
    return (
      <article className="work home__work">
        <h2>Work experience</h2>
        {this.workItem('professional')}

        <h2 className="project__title" data-subline="Only the ones hosted online">
          Personal projects
        </h2>
        {this.personalProjectItem('personal')}
      </article>
    );
  }

  render() {
    return (
      <article className="home">
        {this.personal()}
        {this.work()}
      </article>
    );
  }
}
