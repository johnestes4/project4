import React, { Component } from 'react';
import styles from './styles/index'

class MiniDog extends Component {
  render() {
    let {dog, dogClick} = this.props

    return (
      <div
      onClick={(evt) => dogClick(dog.id)}
      style={styles.miniDogContainer}>
        <img src={dog.img_url} style={styles.miniDogPicture} alt='pupper'></img>
        <div style={styles.miniDogText}>
          <p>RATING: {dog.old_rating}/10</p>
          <p>{dog.bonus}</p>
        </div>
      </div>
    );
  }
}

export default MiniDog;
