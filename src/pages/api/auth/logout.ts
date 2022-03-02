import mysql from "mysql";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const saltRounds = 10;

interface mysqlOptionsType {
  host: any;
  port: any;
  database: any;
  user: any;
  password: any;
}
export default (req: any, res: any) => {
  dotenv.config();
  const mysqlOptions: mysqlOptionsType = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };

  const connection = mysql.createConnection(mysqlOptions);
  connection.connect();
  setInterval(function () {
    connection.query("SELECT 1");
  }, 5000);

  console.log("로그아웃");
  res.clearCookie("token").send("로그아웃");
};
