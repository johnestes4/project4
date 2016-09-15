import axios from 'axios'

function DogModel(){}

DogModel.all = function(){
  var request = axios.get("http://localhost:4000/dogs")
  return request
}

DogModel.create = function(dog){
  var request = axios.post("http://localhost:4000/dogs", dog)
  return request
}

DogModel.update = function(dogId, dogRating, dogBonus){
  var request = axios.put(`http://localhost:4000/dogs/${dogId}`, {rating: dogRating, old_rating: dogRating, bonus: dogBonus})
  return request
}

DogModel.deleteDog = function(dogId){
  var request = axios.delete(`http://localhost:4000/dogs/${dogId}`)
  return request
}

module.exports = DogModel
