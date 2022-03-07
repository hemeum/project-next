import exQuery from "db/db";

export default async (req: any, res: any) => {
  await exQuery("update post set heart = heart - 1 where id = ? ", [
    req.body.postId,
  ]);
  const rows: any = await exQuery(
    "delete from heart where nickname = ? and  post_id = ?",
    [req.body.nickname, Number(req.body.postId)],
  );
  res.send({ isHeart: false });
};
