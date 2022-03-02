import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

interface mysqlOptionsType {
  host: any;
  port: any;
  database: any;
  user: any;
  password: any;
}

export default (req: any, res: any) => {
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

  connection.query(`update post set reply = reply + 1 where id = ?`, [
    Number(req.body.postId),
  ]);
  connection.query(
    "insert into reply(nickname, reply, post_id, date) values(?,?,?,NOW())",
    [req.body.nickname, req.body.reply, Number(req.body.postId)],
    (err: any) => {
      if (err) {
        console.log("DB reply add err");
      } else {
        res.end();
      }
    },
  );
};
