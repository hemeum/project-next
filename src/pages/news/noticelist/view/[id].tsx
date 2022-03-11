import Detail from "src/components/list/Detail";
import axios from "axios";

export default function PageDetail({ list, pageNumbers, detail }: any) {
  return (
    <>
      <Detail list={list} pageNumbers={pageNumbers} detail={detail}></Detail>
    </>
  );
}

export async function getServerSideProps(context: any) {
  /* list, pageNumber → BoardList */
  const res = await axios.post(
    "https://project-next-git-api-lamenking.vercel.app/api/post/list",
    {
      category: context.query.ctg
        ? context.query.ctg
        : context.resolvedUrl ===
            "/community/freelist?ctg=%EC%9E%90%EC%9C%A0%EA%B2%8C%EC%8B%9C%ED%8C%90&page=1&searchType=&searchText=&orderType=%EC%B5%9C%EC%8B%A0%EC%88%9C" ||
          context.resolvedUrl === "/community/freelist"
        ? "자유게시판"
        : "공지사항",
      pageNumber: context.query.page ? context.query.page : 1,
      searchType: context.query.searchType ? context.query.searchType : "",
      searchText: context.query.searchText ? context.query.searchText : "",
      orderType:
        context.query.orderType === "최신순" || !context.query.orderType
          ? "최신순"
          : "좋아요순",
    },
  );
  let leng = res.data.leng;
  const arr: any = [];
  for (let i = 1; i <= Math.ceil(leng / 10); i++) {
    arr.push(i);
  }
  const newArr = [...arr];
  let index = (Math.ceil(context.query.page / 10) - 1) * 10;
  const pageNumbers = newArr.splice(index, 10);
  const list = res.data.list;

  /* detail → Detail */
  const res2 = await axios.post(
    "https://project-next-git-api-lamenking.vercel.app/api/post/detail",
    {
      postId: context.query.id,
    },
  );
  console.log(res2.data);
  const detail = res2.data;

  return {
    props: {
      list: list,
      pageNumbers: pageNumbers,
      detail: detail,
    },
  };
}
