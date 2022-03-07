import exQuery from "db/db";

export default async (req: any, res: any) => {
  const rows: any = await exQuery(
    "update post set title = ?, content = ? where id = ?",
    [req.body.title, req.body.content, req.body.postId],
  );
  res.send({ postId: req.body.postId });
};
