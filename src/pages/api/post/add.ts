import exQuery from "db/db";

export default async (req: any, res: any) => {
  const { nickname, category, title, content } = req.body;
  const rows: any = await exQuery(
    "insert into post(nickname, category, title, content, date) values(?,?,?,?,NOW())",
    [nickname, category, title, content],
  );
  const postId = rows.insertId;
  res.send({ postId: postId });
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
  );*/
};
