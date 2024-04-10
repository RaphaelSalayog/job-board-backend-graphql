import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DEFAULT_DATABASE,
  password: process.env.MYSQL_PASSWORD,
});

export default pool.promise();
