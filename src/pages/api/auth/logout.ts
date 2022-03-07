import exQuery from "db/db";
import { serialize } from "cookie";
export default async (req: any, res: any) => {
  /*res
    .setHeader("Set-Cookie", `token=; path=/; expires=-1`)
    .send({ logout: true });*/

  res
    .setHeader("Set-Cookie", serialize("token", "false"), {
      maxAge: 1,
      httpOnly: true,
    })
    .send({ logout: true });
};
