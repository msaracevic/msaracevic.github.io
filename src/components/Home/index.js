import React from 'react';
import work from '../../data/work.json';
import {workDuration} from "../../helpers/index";
import './Home.scss';

const Chevron = () => <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 30 L50 50 L80 30" strokeWidth="8" stroke="currentColor" fill="none"></path>
  <path d="M20 50 L50 70 L80 50" strokeWidth="8" stroke="currentColor" fill="none"></path>
</svg>

const WorkItems = (props) => {
  const [openSections, setOpenSections] = React.useState(Array.from({length: props.items.length}, (_, i) => i < 4));

  return (
    <section className="work">
      <div className="work__items">
        <h2>Places I've worked at</h2>
        {props.items.map((item, index) => (
          <div key={item.company} className="work__item">
            <header className="work__header"  onClick={() => {
              const newOpenSections = [...openSections];
              newOpenSections[index] = !newOpenSections[index];
              setOpenSections(newOpenSections);
            }}>
              <div className="work__image">
                <img src={item.image} alt={item.company}/>
              </div>
              <div className="work__company-info">
                <h5 className="work__title bold">{item.position}
                  <span
                    className={openSections[index] ? 'work__chevron work__chevron--open' : 'work__chevron work__chevron--closed'}
                   >
                  <Chevron/>
                </span>
                </h5>
                <h6 className="work__title">{item.company}, {item.location}</h6>
                <p className="text--disclaimer">
                  {workDuration(new Date(item.start), item.end ? new Date(item.end) : undefined)}, from {item.start} {item.end ? "to" : "and still active"} {item.end}
                </p>
              </div>
            </header>
            <div className={openSections[index] ? 'work__body work__body--open' : 'work__body work__body--closed'}>
              <div className="work__app-image"><img src={item.appImage} alt={item.company}/></div>
              <div className="work__details">
                <p dangerouslySetInnerHTML={{__html: item.description}}/>
                {item.responsibilities &&
                  <ul>{item.responsibilities.map(responsibility =>
                    <li key={Math.random()} dangerouslySetInnerHTML={{__html: responsibility}}/>
                  )}
                  </ul>}
                <p className="text--bold">Tech stack: {item.technologies}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
};

const Personal = props => (
  <section className="home__personal">
    <div className="home__links">
      <div className="home__my-image"><img src="/images/personal_v2.jpg" alt="personal"/></div>
      <div className="home__contacts">
        {props.contact.map(contact => (
          <a href={contact.url} key={contact.url} className="home__contact" target="_blank" rel="noopener noreferrer">
            <span className="home__contact-image"><img src={contact.image} alt={contact.label}/></span>
            <span className="personal__contact-label">{contact.label}</span>
          </a>
        ))}
      </div>
    </div>
    <div className="home__about">
      <h1>I'm a web development specialist.</h1><br/>
      <p className="text--large">
        Since 2014 I've worked in Berlin in several companies and I was exposed to multiple technologies and projects.
      </p>
      <p className="text--large">
        Regardless of your company size - I can offer technical expertise you need to create or improve your product.
      </p>
      <p className="text--large">
        If you have an interesting project, feel free to send me more information and get in touch with me
        at <a href="mailto:dev.msaracevic@gmail.com">dev.msaracevic@gmail.com</a>.
      </p>
      <p className="text--large bold">
        <span>Currently </span>
        <span className={`home__status home__status--${work.available ? 'active' : 'inactive'}`}>
          {work.available ? 'open for opportunities' : 'passively open for opportunities'}.
        </span>
      </p>
    </div>
  </section>
);

const TechIcons = () => (
  <section className="home__tech">
    <h2>Technologies I use</h2><br/>
    {['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Redux', 'Node.js', 'PostgreSQL'].map(tech =>
      <div className="home__tech-item" key={tech}>
        <div className="home__tech-image">
          <img src={`/images/tech/${tech.toLowerCase()}.png`} alt={tech}/>
        </div>
        <p className="text--bold">{tech}</p>
      </div>
    )}
  </section>
);

const Recommendations = () => (
  <section className="home__recommendations-wrapper">
    <div className="home__recommendations">
      <h2>People I worked with</h2><br/>
      <div className="recommendation">
        <p className="recommendation__paragraph">
          Miroslav worked for us as a front-end developer where he used JavaScript, CSS and HTML to improve important
          parts of our application. He introduced some changes to our technology stack which led to better overall
          application performance. This decreased the loading times from several seconds to a few milliseconds.
        </p>
        <p className="text--bold recommendation__paragraph">
          Miroslav is a very quick learner who shows deep interest in his profession and building great products.
          I can highly recommend Miroslav as a developer and great team member.
        </p>
        <div className="recommendation__author">
          <div className="recommendation__author-image">
            <img src="/images/philipp.jpeg" alt="philipp"/>
          </div>
          <div>
            <span className="text--bold">Philipp Stelzer</span><br/>
            CSO, Co-Founder, <br/>
            Formation GmbH. <br/>
            Worked together on 2 projects.
          </div>
        </div>
      </div>

      <div className="recommendation">
        <p className="recommendation__paragraph">
          Miroslav worked for my company as a developer and made an impact from day one.
          He did a great job building up an analytics dashboard from scratch, using D3JS, Javascript and CSS.
        </p>
        <p className="text--bold recommendation__paragraph">
          He is a fast learner and very interested in all things web, especially the front end. I highly
          recommend Miroslav as a developer.
        </p>
        <div className="recommendation__author">
          <div className="recommendation__author-image">
            <img src="/images/simon.jpeg" alt="simon"/>
          </div>
          <div>
            <span className="text--bold">Simon Eichenauer</span><br/>
            Founder, <br/>
            ShieldIT UG. <br/>
            Worked together on 1 project.
          </div>
        </div>
      </div>
    </div>
  </section>
);

const GetInTouch = () => (
  <section className="home__get-in-touch">
    <p>
      <span className='text--bold text--large'>I understand the importance of communication</span><br/>
      That is why I put emphasis on keeping you informed on weekly basis on the progress. I also put effort in
      setting up testing instance as soon as possible where you can play around at any time.
    </p><br/>
    <p>
      <span className='text--bold text--large'>I understand the big picture</span><br/>
      I've gained experience by working in multiple projects and I have the ability to ask the big picture
      questions and to really understand how your product will interact with other parts of your business.
    </p><br/>
    <p>
      <span className='text--bold text--large'>I understand the value of time</span><br/>
      I know that both your and mine time has value. That is why I focus on effective time management. I have a quite
      good feeling about which decisions I can make on my own and for which ones I need your feedback. I'm also able to
      work both as one person team managing your project or as a part of an existing team.
    </p><br/>
    <p>
      <span className='text--bold text--large'>I understand agile workflow</span><br/>
      Every idea and project can be discussed indefinitely, but more often than not, there are going to be few &nbsp;
      <span className='text--small'>(hopefully small)</span> changes along the way. I prefer to work in agile
      environment and I always reserve time slots for feedback rounds and potential changes. That way we can always
      react fast and change directions in case that original plan was not fully realised.
    </p><br/>
    <p>
      <span className='text--bold text--large'>I understand project lifecycle</span><br/>
      Sometimes writing fancy one line solves it all lines of code is fun, but those tend to complicate things later. I
      focus on writing clean, simple and efficient code with emphasis on readability, understandability and maintenance.
      I've seen how longer project code bases can look like and I want to be able to give clean handover when my work is
      finished.
    </p>
    <h2 className='title'>Get in touch</h2>
    <p className="text--large">
      For any inquiries feel free to send me an email to <a
      href="mailto:dev.msaracevic@gmail.com">dev.msaracevic@gmail.com</a>.<br/>
      More references are available upon request.
    </p>
  </section>
);

const Home = () => (
  <article className="home">
    <Personal contact={work.contact}/>
    <TechIcons/>
    <Recommendations/>
    <WorkItems items={work.professional}/>
    <GetInTouch/>
  </article>
);

export default Home;
