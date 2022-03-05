import styled from "styled-components";
import { useState } from "react";

import Footer from "../contain/footer/Footer";
import BoardList from "./BoardList";
import PageTop from "./PageTop";

export default function List({ ctg, list, pageNumbers }: any) {
  const [isSelect, setIsSelect] = useState(false);
  return (
    <>
      <Wrap
        onClick={() => {
          // 외부 영역 클릭 시 selectSearch 닫기
          if (isSelect === true) {
            setIsSelect(!isSelect);
          }
        }}
      >
        <PageTop></PageTop>

        <ListMain>
          <BoardList
            ctg={ctg}
            isSelect={isSelect}
            setIsSelect={setIsSelect}
            list={list}
            pageNumbers={pageNumbers}
          />
        </ListMain>
      </Wrap>
      <Footer></Footer>
    </>
  );
}

const Wrap = styled.div`
  position: relative;
  min-width: 1300px;
  height: 1720px;
`;

const ListMain = styled.div`
  position: absolute;
  top: 380px;
  left: 50%;
  transform: translateX(-50%);
  width: 1280px;
  margin-top: 50px;
`;
