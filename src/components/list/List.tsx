import styled from "styled-components";
import { SetStateAction, useState } from "react";

import Footer from "../contain/footer/Footer";
import BoardList from "./BoardList";
import PageTop from "./PageTop";

export default function List({ ctg }: any) {
  const [isSelect, setIsSelect] = useState(false);
  const [selectSearch, setSelectSearch] = useState("제목");
  const [detailToggle, setDetailToggle] = useState(false);

  const handleSelectSearch: any = (e: {
    target: { textContent: SetStateAction<string> };
  }) => {
    setSelectSearch(e.target.textContent);
    setIsSelect(!isSelect);
  };

  const clickSelectedSearch = () => {
    setIsSelect(!isSelect);
  };

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
          <MainTop isSelect={isSelect}>
            <h2>{ctg}</h2>
            <div>
              <div>
                <div onClick={clickSelectedSearch}>{selectSearch}</div>
                <ul>
                  <li onClick={handleSelectSearch}>제목</li>
                  <li onClick={handleSelectSearch}>내용</li>
                  <li onClick={handleSelectSearch}>제목 + 내용</li>
                  <li onClick={handleSelectSearch}>닉네임</li>
                </ul>
                <I
                  aria-hidden
                  className="fas fa-chevron-down"
                  isSelect={isSelect}
                ></I>
              </div>
              <div>
                <input type="text" placeholder="검색어를 입력해주세요."></input>
                <i aria-hidden className="fas fa-search"></i>
              </div>
            </div>
          </MainTop>
          <MainCon>
            <BoardList
              ctg={ctg}
              detailToggle={detailToggle}
              setDetailToggle={setDetailToggle}
            />
          </MainCon>
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

const MainTop = styled.div<{ isSelect: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  div {
    display: flex;
    align-items: center;
    div {
      position: relative;
      height: 50px;
      font-size: 14px;
      div {
        width: 120px;
        height: 100%;
        padding-left: 10px;
        border: ${({ isSelect }) => {
          return isSelect ? "1px solid black" : "1px solid lightgray";
        }};
      }
      ul {
        display: ${({ isSelect }) => {
          return isSelect ? "block" : "none";
        }};
        position: absolute;
        bottom: -189px;
        left: 0;
        width: 120px;
        border: 1px solid black;
        border-top: none;
        li {
          width: 100%;
          height: 100%;
          padding-left: 10px;
          line-height: 46px;
          color: gray;
          border-bottom: 1px solid lightgray;
          background-color: #fff;
          :hover {
            background-color: #f5f5f5;
            color: black;
          }
        }
      }
      input {
        width: 310px;
        height: 100%;
        padding-left: 10px;
        border: 1px solid lightgray;
        border-left: none;
        :focus {
          outline: none;
          border: 1px solid black;
        }
      }
      i {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
      }
    }
  }
`;

const I = styled.i<{ isSelect: boolean }>`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: ${({ isSelect }) => {
    return isSelect
      ? "translateY(-50%) rotate(180deg) !important"
      : "translateY(-50%) rotate(0deg) !important";
  }};
`;

const MainCon = styled.div`
  width: 100%;
`;
