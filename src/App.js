import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js';

import Hiragana from './components/Hiragana.js';

class App extends Component {

  constructor(props) {
    super();

    this.state = {
      view: <Home />,
      b: false,
    };
    this.view =  <Home callback={this.callback}/>
  }
  callback = (newView) => {
    this.view = newView;
    this.setState({b:true});
  }

  render() {
    return (
      <div className="App">
        <div className="container-main" id="mainContent">
          {(this.state.b) ? this.view : this.view}
        </div>
      </div>
    );
  }
}

export default App;
