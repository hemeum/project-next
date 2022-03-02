import exQuery from "db/db";

export default async (req: any, res: any) => {
  const rows: any = await exQuery(
    "update post set view = view + 1 where id =?",
    [req.body.postId],
  );
  res.send({ postId: req.body.postId });
  /*const mysqlOptions: mysqlOptionsType = {
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
    "update post set view = view + 1 where id =?",
    [req.body.postId],
    (err: any) => {
      if (err) {
        console.log("db err 뷰 증가");
      } else {
        res.send({ postId: req.body.postId });
      }
    },
  );*/
};
