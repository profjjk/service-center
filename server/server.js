const express = require('express');
const { connect } = require('mongoose');
require('./scripts/seedDB');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

const cors = require('cors');
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const routes = require('./routes');
app.use(routes);

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017')
    .then(() => console.log('Connected to Service Center database.'))
    .catch(err => console.log('Failed to connect to database.' + '\n' + `Error: ${err.message}`));

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));