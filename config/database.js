const mongoose = require('mongoose');
const mongo = require("mongodb").MongoClient;
require('dotenv').config();

/* *************** Database connection *********** */


const devConnection = process.env.DB_STRING;

mongoose.connect(devConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
}).then(() => {
    console.log("connection successfull");
}).catch((error) => {
    console.log("connection failed", error);
});

mongoose.connection.on('connected', () => {
    console.log('Primary Database connected');
});