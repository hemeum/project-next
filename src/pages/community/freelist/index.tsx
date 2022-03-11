import List from "src/components/list/List";
import axios from "axios";
import { useEffect } from "react";

export default function PageFreeList({ list, pageNumbers }: any) {
  // useRouter()는 서버에서 제대로 동작불가
  // 하지만 useRouter를 통해서 pre-render가 필요한 것이 아니라면 상관없음.
  // pre-render할 것이 아니라면 CSR로 동작하여도 됌.
  useEffect(() => {
    // 서버에서 실행은 되었으나 제대로 동작되지 못함. 따라서 터미널 콘솔에 찍히지 못함.
    // 브라우저에서도 서버와 마찬가지로 실행이 되고, 브라우저에서는 제대로 동작하기 때문에 브라우저 콘솔에 찍힘
    // 브라우저가 서버에서 만든 프리렌더 HTML을 그대로 다운받더라도 콘솔까지 완전 똑같이 다운받지 않음.
    // 콘솔은 각각의 그것.
  }, []);
  return <List list={list} pageNumbers={pageNumbers}></List>;
}

export async function getServerSideProps(context: any) {
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
  return {
    props: {
      list: list,
      pageNumbers: pageNumbers,
    },
  };
}
