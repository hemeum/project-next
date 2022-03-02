import exQuery from "db/db";
export default async (req: any, res: any) => {
  const rows: any = await exQuery(
    "select username from user where username = ?",
    [req.body.username],
  );
  if (rows.length === 0) {
    console.log("사용가능한 아이디 입니다.");
    res.send(true);
  } else {
    console.log("중복된 아이디 입니다.");
    res.send(false);
  }
  /*dotenv.config();
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
    "select username from user where username = ?",
    [req.body.username],
    (err: any, rows: []) => {
      if (err) {
        console.log("중복 아이디 조회 DB err");
      } else if (rows.length === 0) {
        console.log("사용가능한 아이디 입니다.");
        res.send(true);
      } else {
        console.log("중복된 아이디 입니다.");
        res.send(false);
      }
    },
  );*/
};
