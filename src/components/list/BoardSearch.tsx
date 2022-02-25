import { useState } from "react";
import { SetStateAction } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function BoardSearch({ isSelect, setIsSelect }: any) {
  const router = useRouter();
  const ctg = router.query.ctg;
  const orderType = router.query.orderType;

  const [searchType, setSearchType] = useState("제목");
  const [searchText, setSearchText] = useState("");

  const handleSearchType: any = (e: {
    target: { textContent: SetStateAction<string> };
  }) => {
    setSearchType(e.target.textContent);
    setIsSelect(!isSelect);
  };

  const clickSelectedSearch = () => {
    setIsSelect(!isSelect);
  };

  return (
    <>
      <MainTop isSelect={isSelect}>
        <h2>{ctg ? ctg : "자유게시판"}</h2>
        <div>
          <div>
            <div onClick={clickSelectedSearch}>{searchType}</div>
            <ul>
              <li onClick={handleSearchType}>제목</li>
              <li onClick={handleSearchType}>내용</li>
              <li onClick={handleSearchType}>제목 + 내용</li>
              <li onClick={handleSearchType}>닉네임</li>
            </ul>
            <I
              aria-hidden
              className="fas fa-chevron-down"
              isSelect={isSelect}
            ></I>
          </div>
          <div>
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              value={searchText}
            ></input>
            <i
              aria-hidden
              className="fas fa-search"
              onClick={() => {
                if (searchText.length < 2) {
                  window.alert("최소 두 글자 이상 입력해주세요.");
                  return;
                } else {
                  router.push({
                    pathname: "/community/freelist",
                    query: {
                      ctg: ctg,
                      page: 1,
                      searchText: searchText,
                      searchType: searchType,
                      orderType:
                        orderType === "최신순" || !orderType
                          ? "최신순"
                          : "좋아요순",
                    },
                  });
                  setSearchText("");
                }
              }}
            ></i>
          </div>
        </div>
      </MainTop>
    </>
  );
}

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
  cursor: pointer;
`;
