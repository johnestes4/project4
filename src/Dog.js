import React, { Component } from 'react';
import styles from './styles/index'

class Dog extends Component {
  render() {
    let {dog, handleDogSubmit, handleRatingChange, handlePettableChange, handleHangChange, handleNoDogChange} = this.props

    return (
      <div style={styles.dogContainer}>
        <img src={dog.img_url} style={styles.dogPicture} alt='pupper'></img>
        <form onSubmit={(evt) => handleDogSubmit(evt, this.props.dog)}>
          <h3>RATING: <input type="number" name="rating" min='1' max='12' onChange={(evt) => handleRatingChange(evt, this.props.dog)} value={dog.rating} style={styles.ratingField}/>/10<br/></h3>
          <p>{dog.bonus}</p>
          <input type="radio" name="bonus" onChange={(evt) => handlePettableChange(evt)} />Highly Pettable<br/>
          <input type="radio" name="bonus" onChange={(evt) => handleHangChange(evt)} />Hang In There Pupper<br/>
          <input type="radio" name="bonus" onChange={(evt) => handleNoDogChange(evt)} />No Dog Sighted<br/>
          <input type="submit" value="Submit" /><br/>
        </form>
      </div>
    );
  }
}

export default Dog;
