// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users_routes = require('./routes/users_routes');
const pets_routes = require('./routes/pets_routes');

// Setting constants
const port = 3000;

// Setting Express.js instance
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));    // Setting MiddleWare for parsing
app.use(bodyParser.json());

// Setting routes for the API
app.use('/users', users_routes);
app.use('/pets', pets_routes);

app.listen(port, () => console.log(`API listening on port ${port}.`))
