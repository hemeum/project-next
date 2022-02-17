import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportLocal from "passport-local";
import jwt from "jsonwebtoken";
import passportJwt from "passport-jwt";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

const saltRounds = 10;
const app = express();
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

app.use(cookieParser());
app.use(express.json()); // express 4.x이상 버전에선 body-parser 내장. 따라서 express.json()으로 해주면 됌.
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

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

app.get("/", (req, res) => {
  res.send("hello world");
});

import authRoute from "./routes/auth";
const auth = authRoute(connection, passport, jwt, bcrypt, saltRounds);
app.use("/auth", auth);

import postRoute from "./routes/post";
const post = postRoute(connection);
app.use("/post", post);

app.get("/test", (req, res) => {
  let a = [1, 2, 3];
  res.send(a);
});

app.listen(6000, () => {
  console.log("express 서버 구동");
});
