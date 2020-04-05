'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4000 ;
const app = express();
app.use(cors());
app.use(express.static('./public'));
app.get('/location',(request,response) =>{
  // response.status(200).send
  try{
    const geoData = require('./data/geo.json');
    const city = request.query.city;
    // response.status(200).send(city);
    const locationData = new Location(city,geoData);
    response.status(200).json(locationData);
  }catch(error){
    errorHandeler(error,request,response);
  }
});
app.get('/weather',(request,response) =>{
  // response.status(200).send
  try{
    const weatherData = require('./data/darksky.json');
    // console.log(weatherData.data);
    weatherData.data.forEach(element => {
      var weather = new Weather(element);
      Weather.all.push(weather);
    });
    // console.log(Weather.all);
    response.status(200).json(Weather.all);
  }catch(error){
    errorHandeler(error,request,response);
  }
});
app.use('*',notFoundHandeler);
function notFoundHandeler(request,response){
  response.status(404).send('error 404 page not found');
}


function errorHandeler(error,request,response){
  response.status(404).send(`error 404 your entered city not found ${Weather.all}`);
}

function Location(city,geoData){
  this.search_query = city;
  this.formatted_query =geoData[0].display_name;
  this.latitude =geoData[0].lat;
  this.longitude = geoData[0].lon;
}
// {
//   "forecast": "Partly cloudy until afternoon.",
//   "time": "Mon Jan 01 2001"
// },
function Weather(obj){
  this.forecast=obj.weather.description;
  this.time = new Date(obj.valid_date).toDateString();
}
Weather.all =[];
app.listen(PORT ,() => console.log(`the server is up and running on port : ${PORT}`));
