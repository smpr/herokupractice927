require('dotenv').config();

var mongoose = require('mongoose');
var Schema = require("./schema.js");

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("database has been connected!");
});

var CompanyModel = Schema.CompanyModel;
var SnowboardModel = Schema.SnowboardModel;

CompanyModel.remove({}, function (err) {
    console.log(err);
});

const burton = new CompanyModel({ name: 'Burton', country: 'US'})
const dc = new CompanyModel({ name: 'DC', country: 'US'})
const ktwo = new CompanyModel({ name: 'K2', country: 'Canada'})

const littleSnowboard = new SnowboardModel({ name: 'Little Snowboard', price: 123.45}) 
const bigSnowboard = new SnowboardModel({ name: 'Big Snowboard', price: 123.45}) 
const blueSnowboard = new SnowboardModel({ name: 'Blue Snowboard', price: 123.45}) 

const companies = [burton, dc, ktwo]
const snowboards = [littleSnowboard, bigSnowboard, blueSnowboard]


// Here we assign some projects to each student.
companies.forEach((company) => {

    company.snowboards = snowboards

    company.save()
        .then((company) => {
            console.log(`${company.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});

// Disconnect from database
db.close();