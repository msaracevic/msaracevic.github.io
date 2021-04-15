import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import About from './components/Home';
import Resources from './components/Resources';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <main className="page-content-main">
          <Route exact path="/" component={About}/>
          <Route exact path="/resources" component={Resources}/>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
