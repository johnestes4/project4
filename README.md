# Project 4: RateMyDog

RateMyDog is a React app that pulls pictures of dogs and their assigned ratings from two separate Rails-hosted APIs, and allows the user to give those dog pictures their own rating on a scale of 8-12, as well as assign them one of three descriptions. The data displayed is the average of all the numerical ratings the dogs have received, and the description that got the most votes.

The API works to keep track of every vote submitted, and recalculate what the average rating and most popular description is for each specific dog. This is done after each vote is cast.

The dog pictures are taken from the subreddit /r/lookatmydog, and the basic joke is inspired by the WeRateDogs twitter account.
