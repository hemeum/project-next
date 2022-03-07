import exQuery from "db/db";

export default async (req: any, res: any) => {
  const rows: any = await exQuery("select * from post where id = ?", [
    Number(req.body.postId),
  ]);
  const detail = rows[0];
  res.send(detail);
};
