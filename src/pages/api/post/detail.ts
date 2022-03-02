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

  connection.query(
    "select * from post where id = ?",
    [Number(req.body.postId)],
    (err: any, rows: any) => {
      if (err) {
        console.log("DB detail 가져오기 err");
      } else {
        const detail = rows[0];
        res.send(detail);
      }
    },
  );
};
