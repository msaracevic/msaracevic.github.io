import React, {Component} from 'react';
import LoadingScreen from '../ux/LoadingScreen';

export default class EmbeddedLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading:      true,
      id:           this.props.gist.split('/')[1],
      src:          this.props.gist,
      file:         this.props.file || null,
      titleClass:   this.props.titleClass || null,
      wrapperClass: this.props.wrapperClass || null,
      stylesheet:   null,
      description:  '',
      content:      ''
    };
    
    this.setCallback();
  }

  setCallback() {
    window[`gist_callback_${this.state.id}`] = function (gist) {
      /*
       * Once we fire up this callback, we wanna add some classes to title if there is any and grab content,
       * descriptions and flip the loading flag. This will trigger stateChange which in turn will render this
       * component.
       * NOTE: Title here is not done in react way, it is just a string, which is then prepended to gist response
       *       content which is then set as inline HTML inside the component.
       */
      let title = `<h2 ${this.state.titleClass ? `class=${this.state.titleClass}` : ``}>${gist.description}</h2>`;
      this.setState({
        loading:     false,
        content:     `${title}${gist.div.replace(/href=/g, 'target="_blank" href=')}`,
        description: gist.description
      });
      /*
       * Not perfect way to do things, ideally parent component would have state of all loaded stylesheets
       * and add them as needed, but because I want to keep this as module and you can call more than once
       * this component, the only easy way for now is to check if the head already has this stylesheet inside
       * NOTE: document.styleSheets doesn't work here, since stylesheet will be added there only once it is 
       *       fully loaded, which means that if you have this component twice or more in a row there is high
       *       chance it will not recognize this stylesheet as already being added
       */
      if (document.head.innerHTML.indexOf(gist.stylesheet) === -1) {
        let stylesheet = document.createElement('link');
        stylesheet.type = 'text/css';
        stylesheet.rel = 'stylesheet';
        stylesheet.href = gist.stylesheet;
        document.head.appendChild(stylesheet);
      }
    }.bind(this);
  }

  componentDidMount() {
    /* 
     * Load gist from github and attach callback param to be executed once this script finishes loading
     * The callbacks are going to be named as gist_callback_:ID where ID is the hash of the gist
     */
    const script = document.createElement('script');
    let url = `https://gist.github.com/${this.state.src}.json?callback=gist_callback_${this.state.id}`;
    if (this.state.file) url += `&file=${this.state.file}`;
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen/>
    } else {
      return <article className={this.state.wrapperClass} dangerouslySetInnerHTML={{__html: this.state.content}}/>
    }
  }
}

/*
 *   Example usage (all but gist parameter are optional):
 *   
 *   <EmbeddedLoader gist="msaracevic/5d757e2fc72482a9a4a439969500c2eb"
 *                   wrapperClass="gist__bash"
 *                   titleClass="gist__title"
 *                   file=".bash_profile.sh"/>
 */
