import React, {Component} from 'react'
import styles from './styles/index'
import MiniDog from './MiniDog'

class MiniDogs extends Component {
  render(){
    var dogs = this.props.dogs.map(function(dog, index){
      return(
        <MiniDog
          dogClick={this.props.dogClick.bind(this) }
          key={dog.id}
          dog={dog} />
      )
    }, this)
    return (
      <div style={styles.miniDogRow}>
          {dogs}
      </div>
    )
  }
}

export default MiniDogs
