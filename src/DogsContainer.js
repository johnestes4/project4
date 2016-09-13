import React, { Component } from 'react';
import Dogs from './Dogs'
import DogModel from './models/Dog'
import RateModel from './models/Rate'


class DogsContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      dogs: [],
      rates: [],
      rating: 0,
      bonus: 0,
    }
  }
  componentDidMount(){
    this.fetchData()
  }

  fetchData(){
    DogModel.all().then(function(res){
      var dogsSorted = res.data.sort(function(a, b){
        return a.id - b.id;
      })
      this.setState ({
        dogs: dogsSorted,
      })
    }.bind(this))
    RateModel.all().then(function(res){
      var ratesSorted = res.data.sort(function(a, b){
        return a.id - b.id;
      })
      console.log(this)
      this.setState ({
        rates: ratesSorted,
      })
    }.bind(this))
  }

  handleRatingChange(evt, dog) {
    dog.rating = evt.target.value
    this.setState({rating: dog.rating})
    console.log(dog.rating)
    // console.log(this.state.rates)
    // var dogs = this.state.dogs
    // var updatedDog = dogs.find((eachDog) => eachDog.id === dog.id)
    // updatedDog.rating = evt.target.value
    // console.log(updatedDog.rating)
    // DogModel.update(updatedDog.id, updatedDog.rating, updatedDog.bonus)
    // dogs = dogs.sort(function(a, b){
    //   return a.id - b.id;
    // })
    // this.setState({
    //   dogs: dogs
    // })
  }

  submitChanges(evt, dog) {
    evt.preventDefault()

    if (this.state.rating == 0) {
      this.state.rating = 10
    }


    if (this.state.bonus == 1) {
      RateModel.create({dog_id: dog.id, rating: this.state.rating, vote_pettable: true, vote_hang: false, vote_nodog: false})
    }
    else if (this.state.bonus == 2) {
      RateModel.create({dog_id: dog.id, rating: this.state.rating, vote_pettable: false, vote_hang: true, vote_nodog: false})
    }
    else if (this.state.bonus == 3) {
      RateModel.create({dog_id: dog.id, rating: this.state.rating, vote_pettable: false, vote_hang: false, vote_nodog: true})
    }
    else {
      RateModel.create({dog_id: dog.id, rating: this.state.rating, vote_pettable: false, vote_hang: false, vote_nodog: false})
    }

    RateModel.all().then(function(res){
      var ratesSorted = res.data.sort(function(a, b){
        return a.id - b.id;
      })
      console.log(ratesSorted)
      this.setState ({
        rates: ratesSorted,
      })
    }.bind(this))

    // var dogs = this.state.dogs
    // var updatedDog = dogs.find((eachDog) => eachDog.id === dog.id)
    // updatedDog.rating = evt.target.value
    //
    // DogModel.update(updatedDog.id, updatedDog.rating, updatedDog.bonus)
    // dogs = dogs.sort(function(a, b){
    //   return a.id - b.id;
    // })
    // this.setState({
    //   dogs: dogs
    // })

  }

  handlePettableChange (evt) {
    console.log("words")
  }

  handleHangChange (evt) {
    console.log("words")
  }

  handleNoDogChange (evt) {
    console.log("words")
  }

  render() {
    return (
      <div>
        <Dogs
          dogs={this.state.dogs}
          handleDogSubmit={this.submitChanges.bind(this)}
          handleRatingChange={this.handleRatingChange.bind(this)}
          handlePettableChange={this.handlePettableChange.bind(this)}
          handleHangChange={this.handleHangChange.bind(this)}
          handleNoDogChange={this.handleNoDogChange.bind(this)} />
      </div>
    );
  }
}

export default DogsContainer;
