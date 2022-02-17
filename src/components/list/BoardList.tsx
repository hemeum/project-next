import Router, { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

import BoardControll from "./BoardControll";
import BoardInfo from "./BoardInfo";
import { InfoType } from "./BoardInfo";

export default function BoardList() {
  const router: any = useRouter();

  const { isLogin } = useSelector((state: any) => {
    return state.authReducer;
  });
  const [select, setSelect] = useState("최신순");
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.post("/post/list", {}).then((res) => {
      setList(res.data);
    });
  }, []);

  const lists = [...list].reverse().map((item: InfoType) => {
    // reverse()는 state 원본 배열을 뒤집기 때문에 꼭 복제해서 써야한다.
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
      ></BoardInfo>
    );
  });

  const handleWrite = () => {
    if (isLogin) {
      Router.push({
        pathname: "/community/freewrite",
        query: { ctg: router.query.ctg },
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

  const handleCtg = () => {
    if (router.pathname === "/community/freelist") {
      return "자유게시판";
    }
  };

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
      <BoardControll setList={setList} ctg={handleCtg()} />
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
