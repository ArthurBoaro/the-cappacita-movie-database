const express = require('express');
const app = express();
const cors = require('cors');
const commentaryRoute = require('./Controller/Router/commentary.routes')
//const rating = require('./Router/rating.router')
const frontendRoute = require('./Controller/Router/frontend.routes')

// Setup Json Format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Cors
app.use(cors());

// Use Commentary Route
app.use(commentaryRoute)

// Use Frontend Route
app.use(frontendRoute)
// Initialize Server
app.listen(3003, ()=>{
    console.log('Server is up!');
});