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
app.use('*',notFoundHandeler);
function notFoundHandeler(request,response){
  response.status(404).send('error 404 page not found');
}


function errorHandeler(error,request,response){
  response.status(404).send(`error 404 your entered city not found ${request}`);
}

function Location(city,geoData){
  this.search_query = city;
  this.formatted_query =geoData[0].display_name;
  this.latitude =geoData[0].lat;
  this.longitude = geoData[0].lon;
}
app.listen(PORT ,() => console.log(`the server is up and running on port : ${PORT}`));
