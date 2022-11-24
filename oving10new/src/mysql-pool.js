import mysql from 'mysql2';

// Setup MySQL-server connection pool
export let pool = mysql.createPool({
  host: 'mysql-ait.stud.idi.ntnu.no',
  user: 'username', // Replace "username" with your NTNU-username
  password: 'password', // Replace "password" with your password for phpMyAdmin
  database: 'username', // Replace "username" with your NTNU-username
  connectionLimit: 1, // Reduce load on NTNU MySQL server
});
