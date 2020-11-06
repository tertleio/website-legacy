const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

/*
const process = require('process');
const fs = require('fs');
const csv2Json = require('csvtojson');
const json2Csv = require('json2csv').parse;
*/

// MIDDLEWARE
app.use(cors());  // --cross communication between db and backend
app.use(express.json()); // --parses req.body to json
app.use(express.static('public')); // --serves up public front-end as static pages

// ROUTES
app.post('/email-submit', async (req, res) => {
    try {
        const { email } = await req.body;
        const getEmails = await pool.query(`SELECT email FROM signups`);
        getEmails.rows.forEach(i => { // --check for duplicate email
            if (i.email === email) {
                res.status(409).send();
            }
        })
        const newEmail = pool.query(
            `INSERT INTO signups (email) VALUES($1) RETURNING *`, [email]
            );
        res.status(200).send(email);
    } catch (error) {
        console.error(error.message)
    }
});

app.post('/signup-submit', async (req, res) => {
   try {
       const {  email, firstName, lastName, postcode, skillset, lookingFor, linkedin } = req.body; 
            const newForm = await pool.query(`
            UPDATE signups
            SET first_name = $1, last_name = $2, postcode = $3, skillset = $4, looking_for = $5, linkedin = $6 
            WHERE email = $7`,
            [firstName, lastName, postcode, skillset, lookingFor, linkedin, email]
        );  
   } catch (error) {
       console.error(error.message);
   } 
    res.send(req.body)
});


// START SERVER LISTENER 
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});