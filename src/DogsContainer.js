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
      //sort the array of dogs by id, so it doesn't just drop stuff you edited at the end
      //i would like it to just shuffle it but that functionality is NOT IN YET
      var dogsSorted = res.data.sort(function(a, b){
        return a.id - b.id;
      })
      this.setState ({
        dogs: dogsSorted,
      })
    }.bind(this))
    RateModel.all().then(function(res){
      //i don't think sorting the rates really does anything but i just do it anyway to keep everything nice and matching
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
      //prevent the user from entering a number that it won't accept
      evt.target.value = 12
    }
    dog.rating = evt.target.value
    this.setState({rating: dog.rating})
  }

  handlePettableChange (evt) {
    this.setState(
      //so the way Bonus works: the three different bonuses correlate to 1, 2, and 3. later when it actually processes the submission, it checks what number is in the bonus field and applies the corresponding string of text. it also logs it to the console so i can make sure everything is executing right!
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
      //this was entirely to amuse me in my stealing jokes from dog_rates. so i took out that part!
      // var funnyNames = ["Brent", "Bront", "Bort", "Bart", "Brent", "Brint"]
      // var randomName = funnyNames[Math.floor(Math.random() * funnyNames.length)];

      //but oh yeah, the actual function here is that it doesn't execute any of the actual rating stuff if the number is under an 8. All dogs are at least an 8/10 just for being dogs. This is the official corporate stance of WeRateDogs.
      alert("A "+ newRating +" seems low. They're good dogs.")
    }
    else {
      var pettableVote = false
      var hangVote = false
      var noDogVote = false

      //like i said earlier - it checks the bonus value and turns on the boolean that corresponds
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
          //here's a million variables that are used to calculate the averages and which bonus is winning. FIRST OFF.
          var sum = 0
          var pettableCount = 0
          var hangCount = 0
          var noDogCount = 0
          var ratesLength = 0

          //cycle through every rating in the rates array
          for (var i = 0; i < rates.length; i++) {
            //only do anything if the dog id matches the dog in question - so ignores all ratings for other dogs!
            if (rates[i].dog_id === dog.id) {
              //add all the rating numbers to the sum variable and increase the ratesLength variable by 1, later on this will be used to spit out the average
              sum += rates[i].rating
              ratesLength += 1

              //increase the variables that track votes for bonuses - at the end, the one with the highest count will be applied
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
          //here's where it makes the average rating
          var averageRating = parseInt(sum/ratesLength)

          //get the array of dogs
          var dogs = this.state.dogs
          //make a variable with the new values that'll later be merged back in to the original dog
          var updatedDog = dogs.find((eachDog) => eachDog.id === dog.id)
          updatedDog.rating = averageRating

          //check which count is largest and apply the string
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

          //the old_rating value is used to make sure the rating it displays isn't always changed when you change your personal rating. i don't know if i explained it well but trust me it is VITAL
          dog.old_rating = updatedDog.rating
          //and now you update the dog in the dogmodel with the new values it calculated with your vote!
          DogModel.update(updatedDog.id, updatedDog.rating, updatedDog.bonus)
          //sort the dogs again to make sure your updated dog is not sitting at the very end of the list!
          dogs = dogs.sort(function(a, b){
            return a.id - b.id;
          })
          //set the states of dogs and rates so all your changes are kept around locally!
          this.setState({
            dogs: dogs
          })
          this.setState ({
            rates: rates
          })

          //the whichDog value controls which dog is occupying the primary container - this progresses the number by 1 and thus moves you to the next one in the array, unless you're at the end in which case it drops you back at the start.
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
    //if you click a dog in the minidog row it loads it into the primary container.
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
