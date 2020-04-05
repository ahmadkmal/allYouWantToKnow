'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4000 ;
const app = express();
app.use(cors());
app.use('*',notFoundHandeler);
function notFoundHandeler(request,response){
  response.state(404).send('error 404 page not found');
}
app.listen(PORT ,() => console.log(`the server is up and running on port : ${PORT}`));
