import exQuery from "db/db";

export default async (req: any, res: any) => {
  await exQuery("update post set heart = heart + 1 where id = ? ", [
    req.body.postId,
  ]);
  const rows: any = await exQuery(
    "insert into heart(nickname, post_id) values(?,?)",
    [req.body.nickname, req.body.postId],
  );
  res.send({ isHeart: true });
};
