const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// app.use(routes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to Service Center database."))
    .catch(err => console.log("Failed to connect to database." + "\n" + `Error: ${err.message}`));

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));