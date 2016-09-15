import axios from 'axios'

function RateModel(){}

RateModel.all = function(){
  var request = axios.get("https://ratemydog-api.herokuapp.com/rates")
  return request
}

RateModel.create = function(rate){
  var request = axios.post("https://ratemydog-api.herokuapp.com/rates", rate)
  return request
}

RateModel.update = function(newId, newRating, newPettable, newHang, newNoDog){
  var request = axios.put(`https://ratemydog-api.herokuapp.com/rates/${newId}`, {rating: newRating, vote_pettable: newPettable, vote_hang: newHang, vote_nodog: newNoDog})
  return request
}

RateModel.deleteDog = function(rateId){
  var request = axios.delete(`https://ratemydog-api.herokuapp.com/rates/${rateId}`)
  return request
}

module.exports = RateModel
