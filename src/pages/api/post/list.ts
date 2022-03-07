import listSearch from "./../../../../modules/listSearch";
import exQuery from "db/db";

export default async (req: any, res: any) => {
  const rows: any = await exQuery(
    `select * from post where category = ? order by ${
      req.body.orderType === "최신순" ? "id desc" : "heart desc, id desc"
    }`,
    [req.body.category],
  );

  let allListLength = Number(rows.length);
  let searchType = req.body.searchType;
  let searchText = req.body.searchText;
  let page = req.body.pageNumber;
  let spliceRows = [...rows].splice(0, 10 * page);
  if (page === 1) {
    if (!searchText || searchText.length === 0) {
      // 검색하지 않았을 때
      await res.send({ list: spliceRows, leng: allListLength });
    } else {
      // 검색했을 때 listSearch 모듈 사용
      let sendItem = listSearch(searchType, [...rows], searchText, page);
      await res.send(sendItem);
    }
  } else {
    if (!searchText || searchText.length === 0) {
      // 검색하지 않았을 때
      let spliceleng;
      if (spliceRows.length % 10 === 0) {
        spliceleng = 10;
      } else {
        spliceleng = spliceRows.length % 10;
      }
      let list = [...spliceRows].reverse().splice(0, spliceleng).reverse();
      await res.send({
        list: list,
        leng: allListLength,
      });
    } else {
      // 검색했을 때 listSearch 모듈 사용
      let sendItem = listSearch(searchType, [...rows], searchText, page);
      await res.send(sendItem);
    }
  }
};
