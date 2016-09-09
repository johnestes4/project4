import React, { Component } from 'react';
import Dog from './Dog'
import DogModel from './models/Dog'

class DogContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      img_url: 'http://i.imgur.com/q9UcNis.jpg',
      rating: 11,
      pettable: true,
      hang: false,
      noDog: false,
    }
  }

  handleRatingChange (evt) {
    this.setState({rating: evt.target.value});
  }

  handlePettableChange (evt) {
    this.setState({pettable: evt.target.checked});
    this.setState({hang: false});
    this.setState({noDog: false});
  }

  handleHangChange (evt) {
    this.setState({hang: evt.target.checked});
    this.setState({pettable: false});
    this.setState({noDog: false});
  }

  handleNoDogChange (evt) {
    this.setState({noDog: evt.target.checked});
    this.setState({pettable: false});
    this.setState({hang: false});
  }

  handleDogSubmit (evt) {
    evt.preventDefault()
    let component = this
    console.log(component.state.rating)
    console.log(component.state.pettable)
    console.log(component.state.hang)
    console.log(component.state.noDog)
  }

  render() {
    return (
      <Dog
        handleDogSubmit={ (evt) => this.handleDogSubmit(evt) }
        handleRatingChange={ (evt) => this.handleRatingChange(evt) }
        handlePettableChange={ (evt) => this.handlePettableChange(evt) }
        handleHangChange={ (evt) => this.handleHangChange(evt) }
        handleNoDogChange={ (evt) => this.handleNoDogChange(evt) } />
    );
  }
}

export default DogContainer;
