import express from "express";
const router = express.Router();
import listSearch from "./../modules/listSearch";

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
      `select * from post where category = ? order by ${
        req.body.orderType === "최신순" ? "id desc" : "heart desc, id desc"
      }`,
      [req.body.category],
      (err: any, rows: any) => {
        if (err) {
          console.log("DB list * pageNumber 가져오기 err");
        } else {
          let allListLength = Number(rows.length);
          let searchType = req.body.searchType;
          let searchText = req.body.searchText;
          let page = req.body.pageNumber;
          let spliceRows = [...rows].splice(0, 10 * page);
          if (page === 1) {
            if (!searchText || searchText.length === 0) {
              // 검색하지 않았을 때
              res.send({ list: spliceRows, leng: allListLength });
            } else {
              // 검색했을 때
              let sendItem = listSearch(
                searchType,
                [...rows],
                searchText,
                page,
              );
              res.send(sendItem);
            }
          } else {
            if (!searchText || searchText.length === 0) {
              // 검색하지 않았을 때
              let spliceleng;
              if (spliceRows.length % 10 === 0) {
                spliceleng = 10;
              } else {
                spliceleng = spliceRows.length % 10;
              }
              let list = [...spliceRows]
                .reverse()
                .splice(0, spliceleng)
                .reverse();
              res.send({
                list: list,
                leng: allListLength,
              });
            } else {
              // 검색했을 때
              let sendItem = listSearch(
                searchType,
                [...rows],
                searchText,
                page,
              );
              res.send(sendItem);
            }
          }
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
