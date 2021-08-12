const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./config');
// const { resolveSoa } = require('dns');
/*
const path = require('path);
const process = require('process');
const fs = require('fs');
const csv2Json = require('csvtojson');
const json2Csv = require('json2csv').parse;
*/

if (process.env.NODE_ENV === 'dev') {
  const morgan = require('morgan');
  app.use(morgan('dev')); // --req logger
}

// IMPORTS
const { forceHttpsIfProd } = require('./middleware/forceHttps');

// SERVE DYNAMIC SEO CRAWLING
app.get('/robots.txt', (req, res) => {
  if (process.env.HEROKU_ENV === 'staging') {
    res.send('User-agent: *\nDisallow: /');
  } else {
    res.send('User-agent: *\nAllow: /');
  }
});

// MIDDLEWARE
app.enable('trust proxy'); // --give express access to req.secure
app.use('*', forceHttpsIfProd);
app.use(cors()); // --cross communication between db and backend
app.use(express.json()); // --parses req.body to json
app.use(express.static('public')); // --serves up public front-end as static pages

const checkExists = async (table, colVal, rowVal) => {
  const doesExist = await pool.query(`
    SELECT COUNT(*)
    FROM ${table} 
    WHERE ${colVal} = '${rowVal}'`);

  if (doesExist.rows[0].count == 0) return false;
  else return true;
};

// ROUTES
app.post('/email-submit', async (req, res) => {
  try {
    const { email } = await req.body;
    const doesExist = await checkExists('website_signups', 'email', email);
    if (doesExist) res.status(409).send(email);
    else {
      const newEmail = await pool.query(
        `INSERT INTO website_signups (email) VALUES($1) RETURNING *`,
        [email]
      );
      res.status(200).send(newEmail);
    }
  } catch (error) {
    console.error(error);
  }
});

app.post('/signup-submit', async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      postcode,
      skillset,
      lookingFor,
      linkedin,
    } = req.body;
    const newForm = await pool.query(
      `
            UPDATE website_signups
            SET first_name = $1, last_name = $2, postcode = $3, skillset = $4, looking_for = $5, linkedin = $6 
            WHERE email = $7`,
      [firstName, lastName, postcode, skillset, lookingFor, linkedin, email]
    );
  } catch (error) {
    console.error(error.message);
  }
  res.send(req.body);
});

// START SERVER LISTENER
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
