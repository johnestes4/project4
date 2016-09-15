import axios from 'axios'

function DogModel(){}

DogModel.all = function(){
  var request = axios.get("https://ratemydog-api.herokuapp.com/dogs")
  return request
}

DogModel.create = function(dog){
  var request = axios.post("https://ratemydog-api.herokuapp.com/dogs", dog)
  return request
}

DogModel.update = function(dogId, dogRating, dogBonus){
  var request = axios.put(`https://ratemydog-api.herokuapp.com/dogs/${dogId}`, {rating: dogRating, old_rating: dogRating, bonus: dogBonus})
  return request
}

DogModel.deleteDog = function(dogId){
  var request = axios.delete(`https://ratemydog-api.herokuapp.com/dogs/${dogId}`)
  return request
}

module.exports = DogModel
