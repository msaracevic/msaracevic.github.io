import React, {Component} from 'react';
import work from '../../data/work.json';
import {duration} from '../../helpers/index';

const renderWorkItems = (type) => (
  <section className="work">
    {type.map((item, index) => (
      <section key={index} className="work__item">
        <header className="work__header">
          <div className="work__image">
            <img src={item.image} alt={item.company}/>
          </div>
          <div className="work__company-info">
            <h5 className="work__title bold">{item.position}</h5>
            <h6 className="work__title">{item.company}, {item.location}</h6>
            <p className="work__duration">
              From {item.start} to {item.end} ({duration(item.start, item.end)})
            </p>
          </div>
        </header>
        <div className="work__info">
          <p>{item.responsibilities}</p>
          <p className="work__tech">Tech stack: {item.technologies}</p>
        </div>
      </section>
    ))}
  </section>
);

const renderProjectItems = (type) => (
  <section className="projects">
    {type.map((item, index) => (
      <section key={index} className="projects__item">
        <h5 className="projects__title bold">{item.project}</h5>
        <h6 className="projects__title project__link">
          <a href={item.url} target="_blank">Link to project</a> <span className="disclaimer">(opens in new tab)</span>
        </h6>
        <p>{item.description}</p>
        <p className="projects__tech">Tech stack: {item.technologies}</p>
      </section>
    ))}
  </section>
);

const renderContact = (item) => (
  <a href={item.url} key={item.url} className="personal__contact">
    <span className="personal__contact-image">
      <img src={item.image} alt={item.label}/>
    </span>
    <span className="personal__contact-label">{item.label}</span>
  </a>
);


const renderAvailability = (available) => (
  <p className="bold">
    <span>Currently </span>
    <span className={`personal__status personal__status--${available ? 'active' : 'inactive'}`}>
      {available ? 'looking for offers' : 'not looking for offers'}
    </span>
  </p>
);

const renderPersonal = (available, contact) => (
  <section className="about__personal personal">
    <div className="personal__image"><img src="/images/personal.jpg" alt="personal"/></div>
    <h1 className="personal__name">Miroslav Saračević</h1>
    <p className="personal__tagline">
      I am web developer and I've been working in Berlin since 2014. During that time I've worked in several companies
      and was exposed to several technologies. If you wish to contact me, please add me on LinkedIn.
    </p>
    {renderAvailability(available)}
    {contact.map(contact => renderContact(contact))}
  </section>
);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = work;
  };

  render() {
    return (
      <article className="about">
        {renderPersonal(this.state.available, this.state.contact)}
        <div className="about__work">
          {renderWorkItems(this.state.professional)}
          {renderProjectItems(this.state.personal)}
        </div>
      </article>
    );
  }
}
