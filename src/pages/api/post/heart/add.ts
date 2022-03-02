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

  connection.query("update post set heart = heart + 1 where id = ? ", [
    req.body.postId,
  ]);
  connection.query(
    "insert into heart(nickname, post_id) values(?,?)",
    [req.body.nickname, req.body.postId],
    (err: any, rows: any) => {
      if (err) {
        console.log("DB add heart err");
      } else {
        res.send({ isHeart: true });
      }
    },
  );
};
