const Pool = require('pg').Pool;
require('dotenv').config();

/* --alternative to below
const devConfig =  `postgressql://${process.env.PG_USER}:${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const prodConfig = process.env.DATABASE_URL; // heroku psql addon
  
const pool = new Pool({
 connectionString:  process.env.NODE_ENV === 'production' ?  prodConfig : devConifg
});
*/

devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }, // --heroku psql addon expectation
};

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig
);

module.exports = pool;
