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

  bcrypt.hash(req.body.password, saltRounds, (err: any, hash: any) => {
    if (err) {
      console.log("hash err");
      return;
    }
    connection.query(
      "insert into user(username, password, nickname) values(?, ?, ?)",
      [req.body.username, hash, req.body.nickname],
      (err: any) => {
        if (err) {
          console.log("회원가입 err");
        } else {
          res.send("로그인 성공");
        }
      },
    );
  });
};
