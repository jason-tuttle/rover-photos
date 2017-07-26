import React, { Component } from 'react';
import '../styles/App.css';
import GetImageForm from './GetImageForm';
// API KEY: MBRgvlOKuAYkGiAn8EonJ8sbjVtra2epKgMNLRhZ

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Mars Rover Image Browser</h1>
        <GetImageForm />
      </div>
    );
  }
}

export default App;
