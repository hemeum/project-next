import Router, { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

import BoardControll from "./BoardControll";
import BoardInfo from "./BoardInfo";
import { InfoType } from "./BoardInfo";

export default function BoardList({
  ctg,
  setDetailToggle,
  detailToggle,
  page,
}: any) {
  const { isLogin } = useSelector((state: any) => {
    return state.authReducer;
  });
  const [select, setSelect] = useState("최신순");

  const [list, setList] = useState<any>([]);
  const [listToggle, setListToggle] = useState(false); // 그냥 toggle
  const [isPageNumber, setIsPageNumber] = useState(1); // 현재 페이지
  const [pageNumbers, setPageNumbers] = useState<any>([]); // 페이지들

  const getList = (num: number, isMount: boolean) => {
    axios
      .post("/post/list", {
        category: ctg,
        pageNumber: num,
      })
      .then((res) => {
        if (isMount) {
          setList(res.data.list);
        }
      });
  };

  const getPageNumbers = (num: number, isMount: boolean) => {
    axios.post("/post/length", { category: ctg }).then((res) => {
      const leng = res.data.leng;
      const arr: any = [];
      for (let i = 1; i <= Math.ceil(leng / 10); i++) {
        arr.push(i);
      }
      const newArr = [...arr];
      if (isMount) {
        setPageNumbers(newArr.splice(num, 10));
      }
    });
  };

  useEffect(() => {
    if (page) {
      setIsPageNumber(Number(page));
    }
  }, [page]);

  useEffect(() => {
    let isMount = true;
    getList(isPageNumber, isMount);
    getPageNumbers((Math.ceil(isPageNumber / 10) - 1) * 10, isMount);
    return () => {
      isMount = false;
    };
  }, [ctg, listToggle, isPageNumber]);

  const handleWrite = () => {
    if (isLogin) {
      Router.push({
        pathname: "/community/freewrite",
        query: { ctg: ctg },
      });
    } else {
      const yesLogin = confirm("로그인이 필요합니다.");
      if (yesLogin) {
        Router.push("/user/login");
      } else {
        return;
      }
    }
  };

  const lists = [...list].map((item: InfoType, index) => {
    const date = moment(item.date).format("YYYY.MM.DD");
    return (
      <BoardInfo
        key={item.id}
        id={item.id}
        title={item.title}
        content={item.content}
        nickname={item.nickname}
        date={date}
        heart={item.heart}
        view={item.view}
        reply={item.reply}
        ctg={ctg}
        listToggle={listToggle}
        setListToggle={setListToggle}
        detailToggle={detailToggle}
        setDetailToggle={setDetailToggle}
        isPageNumber={isPageNumber}
      ></BoardInfo>
    );
  });

  return (
    <>
      <ListTop>
        <div>
          {select === "최신순" ? (
            <i aria-hidden className="fa-solid fa-check active"></i>
          ) : (
            <i aria-hidden className="fa-solid fa-circle"></i>
          )}
          <p className="active">최신순</p>
        </div>
        <div>
          {select === "좋아요순" ? (
            <i aria-hidden className="fa-solid fa-check active"></i>
          ) : (
            <i aria-hidden className="fa-solid fa-circle"></i>
          )}
          <p>좋아요순</p>
        </div>
      </ListTop>
      <ListNews>
        <li>
          <div>
            <p>공지</p>
            <p>
              <span>알려진 이슈</span>
            </p>
            <p>날짜</p>
          </div>
        </li>
        <li>
          <div>
            <p>공지</p>
            <p>
              <span>알려진 이슈</span>
            </p>
            <p>날짜</p>
          </div>
        </li>
        <li>
          <div>
            <p>공지</p>
            <p>
              <span>알려진 이슈</span>
            </p>
            <p>날짜</p>
          </div>
        </li>
      </ListNews>
      <ul>{lists}</ul>
      <ButtonWrap>
        <WriteButton type="button" onClick={handleWrite}>
          글쓰기
        </WriteButton>
      </ButtonWrap>
      <BoardControll
        isPageNumber={isPageNumber}
        setIsPageNumber={setIsPageNumber}
        pageNumbers={pageNumbers}
      />
    </>
  );
}

const ListTop = styled.div`
  display: flex;
  padding-top: 30px;
  border-top: 3px solid black;
  padding-bottom: 20px;
  border-bottom: 1px solid lightgray;
  font-weight: bold;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
    margin-right: 30px;
    color: gray;
  }
  i {
    font-size: 1px;
    margin-right: 5px;
  }
  .active {
    color: black;
  }
`;

const ListNews = styled.ul`
  li {
    width: 100%;
    height: 60px;
    background-color: #f5f5f5;
    border-bottom: 1px solid lightgray;
    cursor: pointer;
    :hover {
      span {
        border-bottom: 1px solid black;
      }
    }
    div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        :nth-of-type(1) {
          width: 80px;
          padding: 6px;
          margin-left: 10px;
          text-align: center;
          border: 1px solid lightgray;
          border-radius: 20px;
          background-color: #fff;
        }
        :nth-of-type(2) {
          width: 1000px;
        }
        :nth-of-type(3) {
          width: 100px;
          margin-right: 10px;
          text-align: center;
        }
      }
    }
  }
`;

const ButtonWrap = styled.div`
  position: relative;
  height: 110px;
`;

const WriteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 50px;
  margin: 30px 0;
  font-size: 16px;
  color: #fff;
  background-color: #333;
  cursor: pointer;
`;
