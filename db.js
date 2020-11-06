const Pool = require('pg').Pool;

const pool = new Pool ({
  user: 'ryanconnaughton',
  host: 'localhost',
  port: 5432,
  database: 'founderfinder'
});

module.exports = pool;