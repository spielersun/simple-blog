import React, { Component } from 'react';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Simple Blog</h1>
        <Blog />
      </div>
    );
  }
}

export default App;
