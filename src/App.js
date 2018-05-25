import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Libility from './components/Libility';

class App extends Component {
  render() {

   
    return (
      <div className="App">
        <Libility value={[['颜值', 0.7], ['身材', 0.7], ['才华', 1], ['性格', 0.8]]} gapNumber={10}/>
      </div> 
    );
  }
}

export default App;
