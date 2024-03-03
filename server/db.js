const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "21f3001073",
  host: "localhost",
  port: 5432,
  database: "salesdb"
});

module.exports = pool;