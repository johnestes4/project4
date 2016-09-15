import React, { Component } from 'react';
import styles from './styles/index'

class Dog extends Component {
  render() {
    let {dog, handleDogSubmit, handleRatingChange, handlePettableChange, handleHangChange, handleNoDogChange} = this.props

    return (
      <div style={styles.dogContainer}>
        <div style={styles.dogPictureContainer}>
          <img src={dog.img_url} style={styles.dogPicture} class="fancybox" alt='pupper'></img>
        </div>
        <form onSubmit={(evt) => handleDogSubmit(evt, this.props.dog)}>
          <h3>RATING: {dog.old_rating}/10</h3>
          <h4>{dog.bonus}</h4>
          <h3>Rate this dog:</h3>
          <h4>Your Rating: <input type="number" name="rating" min='1' max='12' onChange={(evt) => handleRatingChange(evt, this.props.dog)} style={styles.ratingField}/>/10<br/></h4>
          <input type="radio" name="bonus" onChange={(evt) => handlePettableChange(evt)} />Highly Pettable<br/>
          <input type="radio" name="bonus" onChange={(evt) => handleHangChange(evt)} />Hang In There Pupper<br/>
          <input type="radio" name="bonus" onChange={(evt) => handleNoDogChange(evt)} />No Dog Sighted<br/>
          <input type="submit" value="Submit" style={styles.button}/><br/>
        </form>
      </div>
    );
  }
}

export default Dog;
