import express from "express";
const router = express.Router();

export default (
  connection: any,
  passport: any,
  jwt: any,
  bcrypt: any,
  saltRounds: any,
) => {
  router.post("/login", (req, res: any) => {
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

  router.post("/register", (req: express.Request, res: express.Response) => {
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
    });
  });

  router.post(
    "/repeactCheck",
    (req: express.Request, res: express.Response) => {
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
      );
    },
  );

  /*router.get("/keep_login", (req, res) => {
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
  });*/

  router.get("/logout", (req, res) => {
    console.log("로그아웃");
    res.clearCookie("token").send("로그아웃");
  });
  return router;
};

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

/*
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
*/

/*
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
*/

/*
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
*/

/*
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
*/

/*
app.get("/auth/logout", (req, res) => {
  console.log("로그아웃");
  res.clearCookie("token").send("로그아웃");
});
*/
