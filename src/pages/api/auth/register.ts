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
};
