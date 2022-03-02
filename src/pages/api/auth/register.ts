import bcrypt from "bcrypt";
import exQuery from "db/db";

const saltRounds = 10;

export default async (req: any, res: any) => {
  bcrypt.hash(req.body.password, saltRounds, async (err: any, hash: any) => {
    if (err) {
      console.log("hash err");
      return;
    }
    const rows: any = await exQuery(
      "insert into user(username, password, nickname) values(?, ?, ?)",
      [req.body.username, hash, req.body.nickname],
    );
    res.send("로그인 성공");
  });
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

  bcrypt.hash(req.body.password, saltRounds, (err: any, hash: any) => {
    if (err) {
      console.log("hash err");
      return;
    }
    connection.query(
      "insert into user(username, password, nickname) values(?, ?, ?)",
      [req.body.username, hash, req.body.nickname],
      (err: any) => {
        if (err) {
          console.log("회원가입 err");
        } else {
          res.send("로그인 성공");
        }
      },
    );
  });*/
};
