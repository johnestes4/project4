import React, { Component } from 'react';
import styles from './styles/index'

class Footer extends Component {
  //this isn't used because i couldn't make it work although maybe i coudl now?
  render() {
    return (
      <div>
        <footer style={styles.footer}>scroll through these dogs and give them your best rating</footer>
      </div>
    );
  }
}

export default Footer;
