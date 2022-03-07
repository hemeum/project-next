import exQuery from "db/db";

export default async (req: any, res: any) => {
  await exQuery(`update post set reply = reply - 1 where id = ?`, [
    Number(req.body.postId),
  ]);
  await exQuery("delete from reply where id =?", [Number(req.body.replyId)]);
  res.end();
};
