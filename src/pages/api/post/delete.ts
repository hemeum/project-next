import exQuery from "db/db";

export default async (req: any, res: any) => {
  await exQuery("delete from post where id = ?", [req.body.postId]);
  await exQuery("delete from reply where post_id = ?", [req.body.postId]);
  await exQuery("delete from heart where post_id = ?", [req.body.postId]);
  res.end();
};
