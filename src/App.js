import './App.css';

import React from 'react';
import PromptForm from './form.js';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <div>
        <h4>In the mood for a poem today?</h4>
      </div>
    );
  }
}


function App() {
    return (
    <div className="App">
      <header className="App-header">
        <Example />
        <PromptForm />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
