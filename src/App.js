import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Libility from './components/Libility';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Libility value={[['颜值', 0.9], ['身材', 0.2], ['才华', 0.5], ['性格', 0.5], ['品行', 0.5], ['才艺', 0.5]]}/>
      </div> 
    );
  }
}

export default App;
