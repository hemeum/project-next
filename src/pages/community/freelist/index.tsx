import List from "src/components/list/List";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PageFreeList() {
  const router = useRouter();
  // useRouter()는 서버에서 제대로 동작불가
  // 하지만 useRouter를 통해서 pre-render가 필요한 것이 아니라면 상관없음.
  // pre-render할 것이 아니라면 CSR로 동작하여도 됌.
  useEffect(() => {
    // 서버에서 실행은 되었으나 제대로 동작되지 못함. 따라서 터미널 콘솔에 찍히지 못함.
    // 브라우저에서도 서버와 마찬가지로 실행이 되고, 브라우저에서는 제대로 동작하기 때문에 브라우저 콘솔에 찍힘
    // 브라우저가 서버에서 만든 프리렌더 HTML을 그대로 다운받더라도 콘솔까지 완전 똑같이 다운받지 않음.
    // 콘솔은 각각의 그것.
    let test = 1;
    console.log(test, "freelist page-index.tsx");
  }, []);
  return <List ctg={router.query.ctg}></List>;
}
