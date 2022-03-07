import exQuery from "db/db";

export default async (req: any, res: any) => {
  await exQuery(`update post set reply = reply + 1 where id = ?`, [
    Number(req.body.postId),
  ]);
  const rows: any = await exQuery(
    "insert into reply(nickname, reply, post_id, date) values(?,?,?,NOW())",
    [req.body.nickname, req.body.reply, Number(req.body.postId)],
  );
  res.end();
};
