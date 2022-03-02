import mysql from "mysql";
import dotenv from "dotenv";
import listSearch from "./../../../../modules/listSearch";
import exQuery from "db/db";

dotenv.config();

interface mysqlOptionsType {
  host: any;
  port: any;
  database: any;
  user: any;
  password: any;
}

export default async (req: any, res: any) => {
  const result: any = await exQuery({
    query: `select * from post where category = ? order by ${
      req.body.orderType === "최신순" ? "id desc" : "heart desc, id desc"
    }`,
    value: [req.body.category],
  });
  let allListLength = Number(result.length);
  let searchType = req.body.searchType;
  let searchText = req.body.searchText;
  let page = req.body.pageNumber;
  let spliceRows = [...result].splice(0, 10 * page);
  if (page === 1) {
    if (!searchText || searchText.length === 0) {
      // 검색하지 않았을 때
      await res.send({ list: spliceRows, leng: allListLength });
    } else {
      // 검색했을 때
      let sendItem = listSearch(searchType, [...result], searchText, page);
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
      // 검색했을 때
      let sendItem = listSearch(searchType, [...result], searchText, page);
      await res.send(sendItem);
    }
  }
};

/*export default (req: any, res: any) => {
  const mysqlOptions: mysqlOptionsType = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };

  const connection = mysql.createConnection(mysqlOptions);
  connection.connect();
  setInterval(function () {
    connection.query("SELECT 1");
  }, 5000);

  connection.query(
    `select * from post where category = ? order by ${
      req.body.orderType === "최신순" ? "id desc" : "heart desc, id desc"
    }`,
    [req.body.category],
    (err: any, rows: any) => {
      if (err) {
        console.log("DB list * pageNumber 가져오기 err");
      } else {
        let allListLength = Number(rows.length);
        let searchType = req.body.searchType;
        let searchText = req.body.searchText;
        let page = req.body.pageNumber;
        let spliceRows = [...rows].splice(0, 10 * page);
        if (page === 1) {
          if (!searchText || searchText.length === 0) {
            // 검색하지 않았을 때
            res.send({ list: spliceRows, leng: allListLength });
          } else {
            // 검색했을 때
            let sendItem = listSearch(searchType, [...rows], searchText, page);
            res.send(sendItem);
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
            let list = [...spliceRows]
              .reverse()
              .splice(0, spliceleng)
              .reverse();
            res.send({
              list: list,
              leng: allListLength,
            });
          } else {
            // 검색했을 때
            let sendItem = listSearch(searchType, [...rows], searchText, page);
            res.send(sendItem);
          }
        }
      }
    },
  );
};*/
