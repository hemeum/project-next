import exQuery from "db/db";

export default async (req: any, res: any) => {
  await exQuery("delete from post where id = ?", [req.body.postId]);
  await exQuery("delete from reply where post_id = ?", [req.body.postId]);
  await exQuery("delete from heart where post_id = ?", [req.body.postId]);
  res.end();
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

  connection.query("delete from post where id = ?", [req.body.postId]);
  connection.query("delete from reply where post_id = ?", [req.body.postId]);
  connection.query("delete from heart where post_id = ?", [req.body.postId]);
  res.end();*/
};
