import exQuery from "db/db";
export default async (req: any, res: any) => {
  const rows: any = await exQuery(
    "select username from user where username = ?",
    [req.body.username],
  );
  if (rows.length === 0) {
    console.log("사용가능한 아이디 입니다.");
    res.send(true);
  } else {
    console.log("중복된 아이디 입니다.");
    res.send(false);
  }
};
