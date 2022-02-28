import passport from "passport";
import passportJwt from "passport-jwt";
import mysql from "mysql";

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
  const JwtStrategy = passportJwt.Strategy;
  const Jwtconfig = {
    // req를 자동으로 인자로 받아줌
    jwtFromRequest: (req: any) => {
      // req.cookies에 담긴 jwt 토큰 추출
      const token = req.cookies.token;
      return token;
    },
    secretOrKey: process.env.JWT_SECRET_KEY,
  };
  passport.use(
    "jwt",
    new JwtStrategy(Jwtconfig, (jwt_payload: any, done: any) => {
      // 설정에서 설정한 secretKey로 복호화 해서 자동으로 jwt_payload에 복호화되서 나온 값 넣어줌.
      connection.query(
        "select * from user where id = ?",
        [Number(jwt_payload)],
        (err: any, rows: any) => {
          if (err) {
            console.log("로그인 유지 DB 조회 err");
          } else {
            let user = rows[0];
            done(null, user);
          }
        },
      );
    }),
  );
  if (req.cookies.token) {
    passport.authenticate(
      "jwt",
      { session: false },
      (
        err: any,
        user: {
          id: number;
          username: string;
          password: string;
          nickname: string;
        },
      ) => {
        if (err) {
          console.log("passport jwt 전략 후 콜백 err");
        } else {
          console.log("로그인 토큰 인증 성공!");
          res.send(user.nickname);
        }
      },
    )(req, res);
  } else {
    res.status(403).send("쿠키 없음");
  }
};
