import express from "express";
import next from "next";
import mysql from "mysql";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportLocal from "passport-local";
import jwt from "jsonwebtoken";
import passportJwt from "passport-jwt";

import authRoute from "./routes/auth";
import postRoute from "./routes/post";
const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

const saltRounds = 10;
dotenv.config();

interface mysqlOptionsType {
  host: any;
  port: any;
  database: any;
  user: any;
  password: any;
}

const mysqlOptions: mysqlOptionsType = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const connection = mysql.createConnection(mysqlOptions);
connection.connect();

const Jwtconfig = {
  // req를 자동으로 인자로 받아줌
  jwtFromRequest: (req: any) => {
    // req.cookies에 담긴 jwt 토큰 추출
    const token = req.cookies.token;
    return token;
  },
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const dev = true;

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // 미들웨어
  server.use(cookieParser());
  server.use(express.json()); // express 4.x이상 버전에선 body-parser 내장. 따라서 express.json()으로 해주면 됌.
  server.use(express.urlencoded({ extended: false }));
  server.use(passport.initialize());

  // passport 전략 등록
  passport.use(
    "jwt",
    new JwtStrategy(Jwtconfig, (jwt_payload: any, done: any) => {
      // 설정에서 설정한 secretKey로 복호화 해서 자동으로 jwt_payload에 복호화되서 나온 값 넣어줌.
      connection.query(
        "select * from user where id = ?",
        [Number(jwt_payload)],
        (err, rows) => {
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

  passport.use(
    "local",
    new LocalStrategy((username: string, password: string, done: any) => {
      // req.body.username과 req.body.password가 username, password 파라미터에 들어옴.
      // 해당 정보를 가지고 DB에 있는 username과 password 비교
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
      );
    }),
  );

  server.get("/community/freelist/view/:id", (req, res) => {
    console.log(req.params, req.query.ctg, req.query.page); // req.query는 as로 설정한 url에 있는 쿼리를 읽을 수 있음. 실제 페이지 url에 query를 읽지 못한다.
    // Next에서 사용하고 있는 실제 페이지 /abc/[id]를 3번째 인자로 넣어주고, 해당 동적 라우팅의 쿼리 매개변수 값을 정해서 넣어주면 된다.
    // [id]는 router.query에 포함된다.
    return app.render(req, res, "/community/freelist/view/[id]", {
      id: req.params.id,
      ctg: String(req.query.ctg),
      page: String(req.query.page),
      searchText: String(req.query.searchText),
      searchType: String(req.query.searchType),
      orderType: String(req.query.orderType),
    });
  });

  server.get("/news/noticelist/view/:id", (req, res) => {
    return app.render(req, res, "/news/noticelist/view/[id]", {
      id: req.params.id,
      ctg: String(req.query.ctg),
      page: String(req.query.page),
      searchText: String(req.query.searchText),
      searchType: String(req.query.searchType),
      orderType: String(req.query.orderType),
    });
  });

  const auth = authRoute(connection, passport, jwt, bcrypt, saltRounds);
  server.use("/auth", auth);

  const post = postRoute(connection);
  server.use("/post", post);

  // 그 외 라우팅 처리
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  // 프론트 서버 가동
  server.listen(process.env.PORT || 3000, () =>
    console.log(`next+express front on : localhost:3000`),
  );
});
