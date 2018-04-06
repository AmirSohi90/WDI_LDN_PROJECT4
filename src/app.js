import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Router, Switch } from 'react-router-dom';

import 'bulma';

import Navbar from './components/common/Navbar';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <section className="section">

          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
