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


// Adds initial email to emails.json
app.post('/email-submit', (req, res) => {
    let dataReq = req.body;
    res.status(200).send(req.body);
    
    fs.readFile('./db/emails.json', 'utf8', (err, data) => {
        if (err) return console.log(err);
        // (!) Check if email already exists and return failed
        else {
            const file = JSON.parse(data);
            file.emails.push(dataReq);
            
            const jsonContent = JSON.stringify(file);

            fs.writeFile('./db/emails.json', jsonContent,'utf8', (err) => {
                if (err) return console.log(err);
                else res.status(200).send()
            });
        }
    });
});

// Adds form signup submission to CSV
app.post('/signup-submit', (req, res) => { 
    let data = req.body;
    console.log(req.body)
    res.status(200).send(req.body);
    // save to csv
    data = json2Csv(data, { fields: ["email", "firstName", "lastName", "postcode", "skillset", "lookingFor", "linkedIn"] });
    fs.appendFileSync('./db/signups.csv', data, { 'flags': 'a+' }, (err) => {
        if (err) return console.log(err);
    });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});