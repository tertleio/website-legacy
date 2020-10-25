const express = require('express');
const app = express();
const process = require('process');
const fs = require('fs');
const bodyParser = require('body-parser');
const csv2Json = require('csvtojson');
const json2Csv = require('json2csv').parse;



// Middleware
app.use(bodyParser.json()); // 

// Start static server
app.use(express.static('public'));

// Signup listener
app.post('/signup-submit', (req, res, next) => { 
    let data = req.body;
    res.send(data);
    
    // save to csv
    data = json2Csv(data, { fields: ["email", "firstName", "lastName", "postcode", "skillset", "lookingFor"] });
    fs.appendFileSync('./customers.csv', data, {'flags': 'a+'},(err) => {
        if (err) return console.log(err);
    });
});

// listen for submission
// if already registered || not valid email, do not save

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
