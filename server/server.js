const express = require('express');
const { connect } = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import api routes
const routes = require('./routes');
app.use(routes);

// connect to database
connect(process.env.MONGODB_URI || 'mongodb://localhost:27017')
    .then(() => console.log('Connected to Service Center database.'))
    .catch(err => console.log('Failed to connect to database.' + '\n' + `Error: ${err.message}`));

// update demo data daily
const scheduledUpdates = require('./scripts/scheduledUpdates');
scheduledUpdates.runUpdates();

// start server
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));