import exQuery from "db/db";

export default async (req: any, res: any) => {
  const rows: any = await exQuery(
    "select * from reply where post_id = ? order by date desc",
    [req.body.postId],
  );
  const replys = rows;
  res.send(replys);
};
