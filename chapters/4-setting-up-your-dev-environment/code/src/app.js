import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello from your new dev environment!</h1>
        <p>Why didn't this work when I tried it? FFS!</p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));