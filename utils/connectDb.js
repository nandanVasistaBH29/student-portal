import mysql from "mysql";
export const db = mysql.createConnection({
  host: process.env.AWS_DATABASE_ENDPOINT,
  user: process.env.AWS_DATABASE_USER,
  port: process.env.AWS_DATABASE_PORT,
  password: process.env.AWS_DATABASE_PASSWORD,
  database: process.env.AWS_DATABASE_DATABASE,
});
// db.connect((err) => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
//   console.log("connected to database");
// });
