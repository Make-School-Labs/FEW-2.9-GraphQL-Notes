import React, { Component, useState } from 'react';
import HooksExample from './HooksExample'
import Fancy from './Fancy'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HooksExample />
        <Fancy />
      </div>
    );
  }
}

export default App;
