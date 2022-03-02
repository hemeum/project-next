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
    "update post set view = view + 1 where id =?",
    [req.body.postId],
    (err: any) => {
      if (err) {
        console.log("db err 뷰 증가");
      } else {
        res.send({ postId: req.body.postId });
      }
    },
  );
};
