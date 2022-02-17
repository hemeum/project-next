import express from "express";
const router = express.Router();

export default (connection: any) => {
  router.post("/add", (req, res) => {
    console.log(req.body);
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

  router.post("/list", (req, res) => {
    console.log(req.body.order);
    if (req.body.order !== 1 && req.body.order !== undefined) {
      connection.query(
        `select * from post order by date desc limit ${10 * req.body.order}`,
        (err: any, rows: any) => {
          if (err) {
            console.log("DB list * order 가져오기 err");
          } else {
            res.send(rows.reverse().splice(0, 10));
          }
        },
      );
    } else {
      connection.query(
        "select * from post order by date desc limit 10",
        (err: any, rows: any) => {
          if (err) {
            console.log("DB list 가져오기 err");
          } else {
            res.send(rows);
          }
        },
      );
    }
  });

  router.post("/detail", (req, res) => {
    connection.query(
      "select * from post where id = ?",
      [req.body.postId],
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
    console.log(req.body.category);
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

  return router;
};
