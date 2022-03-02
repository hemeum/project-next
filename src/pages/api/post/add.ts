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

  const { nickname, category, title, content } = req.body;
  connection.query(
    "insert into post(nickname, category, title, content, date) values(?,?,?,?,NOW())",
    [nickname, category, title, content],
    (err: any, rows: { insertId: number }) => {
      if (err) {
        console.log("DB post data 추가 err");
      } else {
        const postId = rows.insertId;
        res.send({ postId: postId });
      }
    },
  );
};
