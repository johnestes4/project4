import axios from 'axios'

function RateModel(){}

RateModel.all = function(){
  var request = axios.get("http://localhost:4000/rates")
  return request
}

RateModel.create = function(rate){
  var request = axios.post("http://localhost:4000/rates", rate)
  return request
}

RateModel.update = function(newId, newRating, newPettable, newHang, newNoDog){
  var request = axios.put(`http://localhost:4000/rates/${newId}`, {rating: newRating, vote_pettable: newPettable, vote_hang: newHang, vote_nodog: newNoDog})
  return request
}

RateModel.deleteDog = function(rateId){
  var request = axios.delete(`http://localhost:4000/rates/${rateId}`)
  return request
}

module.exports = RateModel
