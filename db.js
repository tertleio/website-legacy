const Pool = require('pg').Pool;

const pool = new Pool ({
  user: 'ryanconnaughton',
  password: 'Maniac321!',
  host: 'localhost',
  port: 5432,
  database: 'founderfinder'
});

module.exports = pool;