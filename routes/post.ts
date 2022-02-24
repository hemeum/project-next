import express from "express";
const router = express.Router();

export default (connection: any) => {
  router.post("/add", (req, res) => {
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
    );
  });

  router.post("/edit", (req, res) => {
    connection.query(
      "update post set title = ?, content = ? where id = ?",
      [req.body.title, req.body.content, req.body.postId],
      (err: any) => {
        if (err) {
          console.log("update post db err");
        } else {
          res.send({ postId: req.body.postId });
        }
      },
    );
  });

  router.post("/delete", (req, res) => {
    connection.query("delete from post where id = ?", [req.body.postId]);
    connection.query("delete from reply where post_id = ?", [req.body.postId]);
    connection.query("delete from heart where post_id = ?", [req.body.postId]);
    res.end();
  });

  router.post("/list", (req, res) => {
    connection.query(
      `select * from post where category = ? order by id desc limit ${
        10 * req.body.pageNumber
      } `,
      [req.body.category],
      (err: any, rows: any) => {
        if (err) {
          console.log("DB list * pageNumber 가져오기 err");
        } else {
          if (req.body.pageNumber === 1) {
            res.send({ list: rows });
          } else {
            res.send({
              list: rows.reverse().splice(0, 10).reverse(),
            });
          }
        }
      },
    );
  });

  /*const orderPost = rows;
            const spliceOrderPost = [...rows].reverse().splice(0, 10);
            let splicePostIndexs = [];
            for (let i = 0; i < spliceOrderPost.length; i++) {
              for (let j = 0; j < orderPost.length; j++) {
                if (spliceOrderPost[i] === orderPost[j]) {
                  splicePostIndexs.push(j);
                }
              }
            }
            console.log(splicePostIndexs.reverse()); // 잘라낸 post의 인덱스를 담은 배열*/

  router.post("/detail", (req, res) => {
    connection.query(
      "select * from post where id = ?",
      [Number(req.body.postId)],
      (err: any, rows: any) => {
        if (err) {
          console.log("DB detail 가져오기 err");
        } else {
          const detail = rows[0];
          res.send(detail);
        }
      },
    );
  });

  router.post("/length", (req, res) => {
    connection.query(
      "select * from post where category = ?",
      [req.body.category],
      (err: any, rows: any) => {
        if (err) {
          console.log("list length DB 가져오기 err");
        } else {
          const listLength = Number(rows.length);
          res.send({ leng: listLength });
        }
      },
    );
  });

  router.post("/add/reply", (req, res) => {
    connection.query(`update post set reply = reply + 1 where id = ?`, [
      Number(req.body.postId),
    ]);
    connection.query(
      "insert into reply(nickname, reply, post_id, date) values(?,?,?,NOW())",
      [req.body.nickname, req.body.reply, Number(req.body.postId)],
      (err: any) => {
        if (err) {
          console.log("DB reply add err");
        } else {
          res.end();
        }
      },
    );
  });

  router.post("/delete/reply", (req, res) => {
    connection.query(`update post set reply = reply - 1 where id = ?`, [
      Number(req.body.postId),
    ]);
    connection.query(
      "delete from reply where id =?",
      [Number(req.body.replyId)],
      (err: any) => {
        if (err) {
          console.log("DB reply delete err");
        } else {
          res.end();
        }
      },
    );
  });

  router.post("/edit/reply", (req, res) => {
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
    );
  });

  router.post("/reply", (req, res) => {
    connection.query(
      "select * from reply where post_id = ? order by date desc",
      [req.body.postId],
      (err: any, rows: any) => {
        if (err) {
          console.log("DB Reply 조회 err");
        } else {
          const replys = rows;
          res.send(replys);
        }
      },
    );
  });

  router.post("/add/heart", (req, res) => {
    connection.query("update post set heart = heart + 1 where id = ? ", [
      req.body.postId,
    ]);
    connection.query(
      "insert into heart(nickname, post_id) values(?,?)",
      [req.body.nickname, req.body.postId],
      (err: any, rows: any) => {
        if (err) {
          console.log("DB add heart err");
        } else {
          res.send({ isHeart: true });
        }
      },
    );
  });

  router.post("/delete/heart", (req, res) => {
    connection.query("update post set heart = heart - 1 where id = ? ", [
      req.body.postId,
    ]);
    connection.query(
      "delete from heart where nickname = ? and  post_id = ?",
      [req.body.nickname, Number(req.body.postId)],
      (err: any, rows: any) => {
        if (err) {
          console.log("DB delete heart err");
        } else {
          res.send({ isHeart: false });
        }
      },
    );
  });

  router.post("/heart", (req, res) => {
    connection.query(
      "select * from heart where post_id = ?",
      [req.body.postId],
      (err: any, rows: any) => {
        if (err) {
          console.log("DB heart 조회 에러");
        } else {
          const isHeart = rows.filter((data: any) => {
            return data.nickname === req.body.nickname;
          });
          if (isHeart.length !== 0) {
            res.send({ isHeart: true });
          } else {
            res.send({ isHeart: false });
          }
        }
      },
    );
  });

  router.post("/add/view", (req, res) => {
    connection.query(
      "update post set view = view + 1 where id =?",
      [req.body.postId],
      (err: any) => {
        if (err) {
          console.log("db err 뷰 증가");
        } else {
          res.send({ postId: req.body.postId });
        }
      },
    );
  });

  return router;
};
