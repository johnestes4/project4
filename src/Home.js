import React, { Component } from 'react';
import DogsContainer from './DogsContainer'
import Footer from './Footer'

class Home extends Component {
  render() {
    return (
      <div>
        <DogsContainer />
        <Footer />
      </div>
    );
  }
}

export default Home;
