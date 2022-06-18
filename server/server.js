const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./config');
const path = require('path');
const fs = require('fs');

if (process.env.NODE_ENV === 'dev') {
  const morgan = require('morgan');
  app.use(morgan('dev')); // --req logger
}

// IMPORTS
const { forceHttpsIfProd } = require('./middleware/forceHttps');

// SERVE DYNAMIC SEO CRAWLING
app.get('/robots.txt', (req, res) => {
  if (process.env.NODE_ENV === 'staging') {
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
app.use(express.static('../client/public')); // --serves up public front-end as static pages

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
    let { email } = req.body;
    email = email.toLowerCase();

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

    const emailLowerCase = email.toLowerCase();

    const newForm = await pool.query(
      `UPDATE website_signups
      SET first_name = $1, last_name = $2, postcode = $3, skillset = $4, looking_for = $5, linkedin = $6 
      WHERE email = $7`,
      [
        firstName,
        lastName,
        postcode,
        skillset,
        lookingFor,
        linkedin,
        emailLowerCase,
      ]
    );
  } catch (error) {
    console.error(error.message);
  }
  res.send(req.body);
});

// if no matching routes, try req from app.tertle
app.get('*', (req, res) => {
  const slug = req.params[0];
  res.redirect(302, `https://app.tertle.io${slug}`);
  // res.status(404).sendFile(path.join(__dirname, 'public/fourohfour.html'));
});

// START SERVER LISTENER
const PORT = process.env.PORT || 7331;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
