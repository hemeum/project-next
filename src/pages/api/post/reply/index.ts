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

  connection.query(
    "select * from reply where post_id = ? order by date desc",
    [req.body.postId],
    (err: any, rows: any) => {
      if (err) {
        console.log("DB Reply 조회 err");
      } else {
        const replys = rows;
        res.send(replys);
      }
    },
  );
};
