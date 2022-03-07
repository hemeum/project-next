import exQuery from "db/db";

export default async (req: any, res: any) => {
  const rows: any = await exQuery("select * from heart where post_id = ?", [
    req.body.postId,
  ]);
  const isHeart = rows.filter((data: any) => {
    return data.nickname === req.body.nickname;
  });
  if (isHeart.length !== 0) {
    res.send({ isHeart: true });
  } else {
    res.send({ isHeart: false });
  }
};
