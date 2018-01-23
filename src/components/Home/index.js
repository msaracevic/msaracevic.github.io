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
        <h3 className="work__title">{item.company}, {item.location} - {item.position}</h3>
        <p className="disclaimer">From {item.start} to {item.end}</p>
        <p>Responsibilities: {item.responsibilities}</p>
        <p>Technologies and tools used: {item.technologies}</p>
      </section>
    ));
  }

  render() {
    return (
      <article>
        <section className="personal">
          <section className="personal__image">
            <img src="/images/personal.jpg" alt="personal"/>
          </section>
          <section className="personal__info">
            <h1>Miroslav Saračević</h1>
            <p className="long-text">
              I am web developer and I've been working in Berlin since 2014. During that time I've worked in several companies and was exposed to several technologies. If you wish to contact me, please add me on LinkedIn.</p>
            <p>
              <span className="bold">Currently </span>
              <span className="personal__status personal__status--active">
                looking for offers
              </span>
              {/*<span className="personal__status personal__status--inactive">*/}
              {/*Not looking for offers*/}
              {/*</span>*/}
            </p>
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
          </section>
        </section>
        <article className="work">
          <h3>Work experience</h3>
          {this.workItem('professional')}
        </article>
      </article>
    );
  }
}
