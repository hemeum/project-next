import bcrypt from "bcrypt";
import passport from "passport";
import passportLocal from "passport-local";
import { serialize } from "cookie";
import exQuery from "db/db";
import jwt from "jsonwebtoken";

const LocalStrategy = passportLocal.Strategy;
const saltRounds = 10;

export default async (req: any, res: any) => {
  passport.use(
    "local",
    new LocalStrategy(async (username: string, password: string, done: any) => {
      // req.body.username과 req.body.password가 username, password 파라미터에 들어옴.
      // 해당 정보를 가지고 DB에 있는 username과 password 비교
      const rows: any = await exQuery("select * from user where username = ?", [
        username,
      ]);
      if (rows.length === 0) {
        console.log("존재하지 않는 아이디 err");
        return done(null, false, { msg: "존재하지 않는 아이디입니다." });
      } else {
        bcrypt.compare(password, rows[0].password, (err, result) => {
          if (err) {
            console.log("비밀번호 비교 DB err");
          } else if (result) {
            console.log("로그인 성공!");
            let user = rows[0];
            return done(null, user);
          } else {
            console.log("비밀번호가 틀렸습니다.");
            return done(null, false, {
              msg: "존재하지 않는 비밀번호입니다.",
            });
          }
        });
      }
    }),
  );

  passport.authenticate(
    "local",
    { session: false },
    (err: any, user: any, info: { msg: string }) => {
      if (err) {
        console.log("passport local err", err);
      } else if (!user) {
        res.status(403).send(info.msg);
      } else {
        let secret: any = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(user.id, secret);
        const cookieOptions = { httpOnly: true, maxAge: 60 * 60 * 1000 };
        res
          .setHeader("Set-Cookie", serialize("token", token), cookieOptions)
          .send(user.nickname);
        //res.setHeader("Set-Cookie", token).send(user.nickname);
      }
    },
  )(req, res);
};
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
        "select * from user where username = ?",
        [username],
        (err, rows) => {
          if (err) {
            console.log("로그인 err");
            done(err);
          } else if (rows.length === 0) {
            console.log("존재하지 않는 아이디 err");
            return done(null, false, { msg: "존재하지 않는 아이디입니다." });
          } else {
            bcrypt.compare(password, rows[0].password, (err, result) => {
              if (err) {
                console.log("비밀번호 비교 DB err");
              } else if (result) {
                console.log("로그인 성공!");
                let user = rows[0];
                return done(null, user);
              } else {
                console.log("비밀번호가 틀렸습니다.");
                return done(null, false, {
                  msg: "존재하지 않는 비밀번호입니다.",
                });
              }
            });
          }
        },
      );*/
