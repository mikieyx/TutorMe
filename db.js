const { Pool } = require('pg');

const pool = new Pool({
  user: 'default',
  host: 'ep-young-math-53323449-pooler.us-east-1.postgres.vercel-storage.com',
  database: 'verceldb',
  password: 'hO1gYL8dZDnE',
  port: 5432, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false, // Set to false if your PostgreSQL server is self-signed or uses a certificate from a trusted authority
    sslmode: 'require', // Use 'require' for a secure connection
  },
});

module.exports = pool;

