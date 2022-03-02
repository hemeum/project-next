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
    "update post set title = ?, content = ? where id = ?",
    [req.body.title, req.body.content, req.body.postId],
    (err: any) => {
      if (err) {
        console.log("update post db err");
      } else {
        res.send({ postId: req.body.postId });
      }
    },
  );
};
