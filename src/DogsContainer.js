import React, { Component } from 'react';
import Dogs from './Dogs'
import MiniDogs from './MiniDogs'
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
      whichDog: 0,
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
      this.setState ({
        rates: ratesSorted,
      })
    }.bind(this))
  }

  handleRatingChange(evt, dog) {
    if (evt.target.value > 12) {
      evt.target.value = 12
    }
    dog.rating = evt.target.value
    this.setState({rating: dog.rating})
  }

  handlePettableChange (evt) {
    this.setState(
      {bonus: 1},
      function(){
        console.log(this.state.bonus)
      }
    )
  }

  handleHangChange (evt) {
    this.setState(
      {bonus: 2},
      function(){
        console.log(this.state.bonus)
      }
    )
  }

  handleNoDogChange (evt) {
    this.setState(
      {bonus: 3},
      function(){
        console.log(this.state.bonus)
      }
    )
  }

  submitChanges(evt, dog) {
    evt.preventDefault()

    var newRating = this.state.rating

    if (newRating < 8) {
      var funnyNames = ["Brent", "Bront", "Bort", "Bart", "Brent", "Brint"]
      var randomName = funnyNames[Math.floor(Math.random() * funnyNames.length)];
      alert("A "+ newRating +" seems low. They're good dogs, " + randomName)
    }
    else {
      var pettableVote = false
      var hangVote = false
      var noDogVote = false

      if (this.state.bonus === 1) {
        pettableVote = true
      }
      else if (this.state.bonus === 2) {
        hangVote = true
      }
      else if (this.state.bonus === 3) {
        noDogVote = true
      }

      RateModel.create({dog_id: dog.id, rating: newRating, vote_pettable: pettableVote, vote_hang: hangVote, vote_nodog: noDogVote}).then(function(res){
        RateModel.all().then(function(res){
          var rates = res.data
          var sum = 0
          var pettableCount = 0
          var hangCount = 0
          var noDogCount = 0
          var ratesLength = 0
          for (var i = 0; i < rates.length; i++) {
            if (rates[i].dog_id === dog.id) {
              sum += rates[i].rating
              ratesLength += 1
              if (rates[i].vote_pettable === true) {
                pettableCount += 1
              }
              else if (rates[i].vote_hang === true) {
                hangCount += 1
              }
              else if (rates[i].vote_nodog === true) {
                noDogCount += 1
              }
            }
          }
          var averageRating = parseInt(sum/ratesLength)

          var dogs = this.state.dogs
          var updatedDog = dogs.find((eachDog) => eachDog.id === dog.id)
          updatedDog.rating = averageRating

          if (pettableCount > hangCount && pettableCount > noDogCount) {
            updatedDog.bonus = "Highly Pettable"
          }
          else if (hangCount > pettableCount && hangCount > noDogCount) {
            updatedDog.bonus = "Hang In There Pupper"
          }
          else if (noDogCount > pettableCount && noDogCount > hangCount) {
            updatedDog.bonus = "No Dog Sighted"
          }
          else {
            updatedDog.bonus = "Highly Pettable"
          }

          dog.old_rating = updatedDog.rating
          DogModel.update(updatedDog.id, updatedDog.rating, updatedDog.bonus)
          dogs = dogs.sort(function(a, b){
            return a.id - b.id;
          })
          this.setState({
            dogs: dogs
          })
          this.setState ({
            rates: rates
          })
          if (this.state.whichDog < this.state.dogs.length - 1){
            var newDog = this.state.whichDog + 1
          }
          else {
            var newDog = 0
          }
          this.setState({
            whichDog: newDog
          })

        }.bind(this))
      }.bind(this))
    }
  }

  dogClick(dogId){
    dogId -= 1;
    console.log(dogId)
    this.setState({
      whichDog: dogId
    })
  }

  render() {
    return (
      <div>
        <Dogs
          dogs={this.state.dogs}
          whichDog={this.state.whichDog}
          handleDogSubmit={this.submitChanges.bind(this)}
          handleRatingChange={this.handleRatingChange.bind(this)}
          handlePettableChange={this.handlePettableChange.bind(this)}
          handleHangChange={this.handleHangChange.bind(this)}
          handleNoDogChange={this.handleNoDogChange.bind(this)} />
        <MiniDogs
          dogs={this.state.dogs}
          dogClick={this.dogClick.bind(this)}
        />
      </div>
    );
  }
}

export default DogsContainer;
