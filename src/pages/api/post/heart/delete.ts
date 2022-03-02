import exQuery from "db/db";

export default async (req: any, res: any) => {
  await exQuery("update post set heart = heart - 1 where id = ? ", [
    req.body.postId,
  ]);
  const rows: any = await exQuery(
    "delete from heart where nickname = ? and  post_id = ?",
    [req.body.nickname, Number(req.body.postId)],
  );
  res.send({ isHeart: false });
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

  connection.query("update post set heart = heart - 1 where id = ? ", [
    req.body.postId,
  ]);
  connection.query(
    "delete from heart where nickname = ? and  post_id = ?",
    [req.body.nickname, Number(req.body.postId)],
    (err: any, rows: any) => {
      if (err) {
        console.log("DB delete heart err");
      } else {
        res.send({ isHeart: false });
      }
    },
  );*/
};
