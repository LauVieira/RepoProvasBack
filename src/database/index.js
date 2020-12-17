const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = { connectionString: process.env.DATABASE_URL };
const connection = new Pool(dbConfig);

module.exports = connection;