import exQuery from "db/db";

export default async (req: any, res: any) => {
  const rows: any = await exQuery(
    "update post set view = view + 1 where id =?",
    [req.body.postId],
  );
  res.send({ postId: req.body.postId });
};
