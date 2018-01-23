import React, {Component} from 'react';
import work from '../../data/work.json';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = work;
  };

  workItem(type) {
    return this.state[type].map((item, index) => (
      <section key={index} className="work__item">
        <h5 className="work__title">
          <span className="bold">{item.company}</span>, {item.location} - {item.position}
        </h5>
        <p className="disclaimer">From {item.start} to {item.end}</p>
        <p>Responsibilities: {item.responsibilities}</p>
        <p>Technologies and tools used: {item.technologies}</p>
      </section>
    ));
  }

  static tagline() {
    return (
      <p className="personal__tagline">
        I am web developer and I've been working in Berlin since 2014. During that time I've worked in several companies and was exposed to several technologies. If you wish to contact me, please add me on LinkedIn.
      </p>
    );
  }

  availability() {
    return (
      <p>
        <span className="bold">Currently </span>
        {this.state.available ? (
          <span className="personal__status personal__status--active">
            looking for offers
          </span>
        ) : (
          <span className="personal__status personal__status--inactive">
            not looking for offers
          </span>
        )}
      </p>
    );
  }

  static contact() {
    return (
      <p>
        <a href="https://www.linkedin.com/in/mirsarace" className="personal__contact">
          <span className="personal__contact-image">
            <img src="/images/linkedin.png" alt="linkedin"/>
          </span>
          <span className="personal__contact-label">LinkedIn</span>
        </a>
        <a href="https://github.com/msaracevic" className="personal__contact">
          <span className="personal__contact-image">
            <img src="/images/github.png" alt="github"/>
          </span>
          <span className="personal__contact-label">GitHub</span>
        </a>
      </p>
    );
  }

  personal() {
    return (
      <section className="personal">
        <section className="personal__image">
          <img src="/images/personal.jpg" alt="personal"/>
        </section>
        <section className="personal__info">
          <h1>Miroslav Saračević</h1>
          {Home.tagline()}
          {this.availability()}
          {Home.contact()}
        </section>
      </section>
    );
  }

  render() {
    return (
      <article>
        {this.personal()}
        <article className="work">
          <h3>Work experience</h3>
          {this.workItem('professional')}
        </article>
      </article>
    );
  }
}
