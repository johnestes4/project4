import axios from 'axios'

function DogModel(){}

DogModel.all = function(){
  var request = axios.get("http://localhost:4000/todos")
  return request
}

DogModel.create = function(todo){
  var request = axios.post("http://localhost:4000/todos", todo)
  return request
}

DogModel.deleteTodo = function(todoId){
  var request = axios.delete(`http://localhost:4000/todos/${todoId}`)
  return request
}

module.exports = TodoModel
