export default function listSearch(
  searchType: string,
  rows: any,
  searchText: string,
  page: number,
) {
  if (searchType === "제목") {
    const newRows = [...rows].filter((data) => {
      return data.title.indexOf(searchText) !== -1;
    });
    let spliceNewRows = [...newRows].splice(0, 10 * page);
    let list;
    if (page === 1) {
      list = spliceNewRows;
    } else {
      let spliceleng;
      if (spliceNewRows.length % 10 === 0) {
        spliceleng = 10;
      } else {
        spliceleng = spliceNewRows.length % 10;
      }
      list = [...spliceNewRows].reverse().splice(0, spliceleng).reverse();
    }
    let leng = Number(newRows.length);
    return { list: list, leng: leng };
  } else if (searchType === "내용") {
    const newRows = [...rows].filter((data) => {
      return data.content.indexOf(searchText) !== -1;
    });
    let spliceNewRows = [...newRows].splice(0, 10 * page);
    let list;
    if (page === 1) {
      list = spliceNewRows;
    } else {
      let spliceleng;
      if (spliceNewRows.length % 10 === 0) {
        spliceleng = 10;
      } else {
        spliceleng = spliceNewRows.length % 10;
      }
      list = [...spliceNewRows].reverse().splice(0, spliceleng).reverse();
    }
    let leng = Number(newRows.length);
    return { list: list, leng: leng };
  } else if (searchType === "제목 + 내용") {
    const newRows = [...rows].filter((data) => {
      return (
        data.title.indexOf(searchText) !== -1 ||
        data.content.indexOf(searchText) !== -1
      );
    });
    let spliceNewRows = [...newRows].splice(0, 10 * page);
    let list;
    if (page === 1) {
      list = spliceNewRows;
    } else {
      let spliceleng;
      if (spliceNewRows.length % 10 === 0) {
        spliceleng = 10;
      } else {
        spliceleng = spliceNewRows.length % 10;
      }
      list = [...spliceNewRows].reverse().splice(0, spliceleng).reverse();
    }
    let leng = Number(newRows.length);
    return { list: list, leng: leng };
  } else if (searchType === "닉네임") {
    const newRows = [...rows].filter((data) => {
      return data.nickname.indexOf(searchText) !== -1;
    });
    let spliceNewRows = [...newRows].splice(0, 10 * page);
    let list;
    if (page === 1) {
      list = spliceNewRows;
    } else {
      let spliceleng;
      if (spliceNewRows.length % 10 === 0) {
        spliceleng = 10;
      } else {
        spliceleng = spliceNewRows.length % 10;
      }
      list = [...spliceNewRows].reverse().splice(0, spliceleng).reverse();
    }
    let leng = Number(newRows.length);
    return { list: list, leng: leng };
  }
}
