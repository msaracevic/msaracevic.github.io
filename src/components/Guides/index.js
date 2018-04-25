import React, {Component} from 'react';
import ReactEmbedGist from 'react-embed-gist'

export default class Guides extends Component {
  render() {
    return (
      <article className="guides">
        <ReactEmbedGist gist="msaracevic/7a315f610c11d39aeea55061d3b9bf05"/>
        <ReactEmbedGist gist="msaracevic/5d757e2fc72482a9a4a439969500c2eb"/>
      </article>
    );
  }
}
