import React, {Component} from 'react'
// import styles from './styles/index'
import Dog from './Dog'

class Dogs extends Component {
  render(){
    var dogs = this.props.dogs.map(function(dog, index){
      return(
        <Dog
          key={dog.id}
          dog={dog}
          handleDogSubmit={this.props.handleDogSubmit.bind(this) }
          handleRatingChange={this.props.handleRatingChange.bind(this) }
          handlePettableChange={this.props.handlePettableChange.bind(this) }
          handleHangChange={this.props.handleHangChange.bind(this) }
          handleNoDogChange={this.props.handleNoDogChange.bind(this) } />
      )
    }, this)
    return (
      <div>
        {dogs[this.props.whichDog]}
      </div>
    )
  }
}

export default Dogs
