import exQuery from "db/db";

export default async (req: any, res: any) => {
  const { nickname, category, title, content } = req.body;
  const rows: any = await exQuery(
    "insert into post(nickname, category, title, content, date) values(?,?,?,?,NOW())",
    [nickname, category, title, content],
  );
  const postId = rows.insertId;
  res.send({ postId: postId });
};
