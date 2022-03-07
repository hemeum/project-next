import exQuery from "db/db";

export default async (req: any, res: any) => {
  const rows: any = await exQuery("update reply set reply = ? where id = ?", [
    req.body.reply,
    req.body.replyId,
  ]);
  res.end();
};
