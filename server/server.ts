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

/*
app.get("/auth/keep_login", (req, res) => {
  // passport 안쓸 경우엔 직접 복호화 작업을 해줘야함.
  if (req.cookies.token) {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET_KEY,
      (err: any, result: any) => {
        if (err) {
          console.log("유효하지 않은 토큰");
          return;
        }
        connection.query(
          "select * from user where id = ?",
          [Number(result)],
          (err, rows) => {
            if (err) {
              console.log("로그인 유지 DB 조회 err");
            } else {
              let user = rows[0];
              res.send(user.nickname);
            }
          },
        );
      },
    );
  }
});
*/

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/auth/keep_login", (req, res) => {
  // 로그인할 때 res.cookie로 jwt 토큰을 클라이언트 쿠키에 전송
  // 로그인 유지를 위한 재요청이 들어올 때 req.cookies.key에 담긴 토큰이 존재하면, jwt 전략 실행
  // 전략을 통해 jwt에 담긴 정보로 유저 정보가 조회된다면 리턴된 user로 로그인 유지 정보 클라에게 전달
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
});

app.post(
  "/auth/repeactCheck",
  (req: express.Request, res: express.Response) => {
    connection.query(
      "select username from user where username = ?",
      [req.body.username],
      (err, rows) => {
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
    );
  },
);

app.post("/auth/register", (req: express.Request, res: express.Response) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.log("hash err");
      return;
    }
    connection.query(
      "insert into user(username, password, nickname) values(?, ?, ?)",
      [req.body.username, hash, req.body.nickname],
      (err) => {
        if (err) {
          console.log("회원가입 err");
        } else {
          res.send("로그인 성공");
        }
      },
    );
  });
});

app.post("/auth/login", (req, res: any) => {
  // 로그인 요청이 들어오면, passport의 전략 중 local 전략 실행. local 전략이 수행되고 실행될 함수가 authenticate()의 두번째 콜백으로 들어있는 함수.
  // user가 잘 조회되면 jwt토큰 발급.
  // user가 없다면 403 err
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
        res
          .cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
          .send(user.nickname);
      }
    },
  )(req, res);
});

app.get("/auth/logout", (req, res) => {
  console.log("로그아웃");
  res.clearCookie("token").send("로그아웃");
});

app.get("/test", (req, res) => {
  let a = [1, 2, 3];
  res.send(a);
});

app.listen(6000, () => {
  console.log("express 서버 구동");
});
