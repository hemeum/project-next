import exQuery from "db/db";

export default async (req: any, res: any) => {
  const rows: any = await exQuery("update reply set reply = ? where id = ?", [
    req.body.reply,
    req.body.replyId,
  ]);
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

  connection.query(
    "update reply set reply = ? where id = ?",
    [req.body.reply, req.body.replyId],
    (err: any, rows: any) => {
      if (err) {
        console.log("DB reply update err");
      } else {
        res.end();
      }
    },
  );*/
};
