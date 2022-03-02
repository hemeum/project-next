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

  connection.query(
    "select username from user where username = ?",
    [req.body.username],
    (err: any, rows: []) => {
      if (err) {
        console.log("중복 아이디 조회 DB err");
      } else if (rows.length === 0) {
        console.log("사용가능한 아이디 입니다.");
        res.send(true);
      } else {
        console.log("중복된 아이디 입니다.");
        res.send(false);
      }
    },
  );
};
