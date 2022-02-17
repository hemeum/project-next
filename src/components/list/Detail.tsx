import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

import PageTop from "./PageTop";
import Footer from "./../contain/footer/Footer";
import TitleTop from "./TitleTop";
import BoardList from "./BoardList";
import Reply from "./Reply";
import axios from "axios";
import moment from "moment";

export default function Detail() {
  const router = useRouter();
  const postId = router.query.postId;

  const conRef: any = useRef();

  const [height, setHeight] = useState(200);
  const [detail, setDetail] = useState({
    title: "",
    content: "",
    nickname: "",
    heart: 0,
    view: 0,
    reply: 0,
    date: "",
  });

  useEffect(() => {
    setHeight(conRef.current.clientHeight);
  }, [height]);

  useEffect(() => {
    axios.post("/post/detail", { postId: postId }).then((res) => {
      const date = moment(res.data.date).format("YYYY.MM.DD");
      res.data.date = date;
      setDetail(res.data);
    });
  }, [postId]);

  return (
    <>
      <Wrap height={height}>
        <PageTop></PageTop>
        <DetailMain>
          <TitleTop></TitleTop>
          <Content ref={conRef}>
            <Text>
              <h3>{detail.title}</h3>
              <p>{detail.date}</p>
              <p>{detail.content}</p>
              <div>
                <i></i>
                <span>{detail.heart}</span>
              </div>
              <div>
                <h3>
                  댓글<span>{detail.reply}</span>
                </h3>
                <textarea placeholder="저작권 침해는 제한됩니다."></textarea>
                <div>
                  <p>0 / 200</p>
                  <button type="button">등록</button>
                </div>
                <ul>
                  <Reply></Reply>
                </ul>
              </div>
            </Text>
            <Info>
              <div>
                <img src="/img/logo-loa.png"></img>
                <p>[{detail.nickname}]</p>
                <p>
                  <span>서버</span> 서버명
                </p>
                <p>
                  <span>클래스</span> 클래스명
                </p>
                <p>
                  <span>길드</span> 길드명
                </p>
              </div>
              <div>
                <p>
                  댓글 <span>{detail.reply}</span>
                </p>
                <p>
                  좋아요 <span>{detail.heart}</span>
                </p>
                <p>
                  조회수 <span>{detail.view}</span>
                </p>
              </div>
              <button type="button">글쓰기</button>
            </Info>
          </Content>
          <BoardList></BoardList>
        </DetailMain>
      </Wrap>
      <Footer></Footer>
    </>
  );
}

const Wrap = styled.div<{ height: number }>`
  position: relative;
  min-width: 1300px;
  height: ${({ height }) => {
    return `${height + 2000}px`;
  }};
`;

const DetailMain = styled.div`
  position: absolute;
  top: 380px;
  left: 50%;
  transform: translateX(-50%);
  width: 1280px;
  margin-top: 50px;
`;

const Content = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  margin-bottom: 130px;
`;

const Text = styled.div`
  width: 1030px;
  margin-top: 30px;
  h3 {
    font-size: 25px;
    margin-bottom: 5px;
  }
  > p {
    :nth-of-type(1) {
      padding-bottom: 15px;
      border-bottom: 1px solid gray;
      color: gray;
    }
    :nth-of-type(2) {
      margin: 50px 0;
      font-size: 16px;
    }
  }
  > div {
    :nth-of-type(1) {
      width: 110px;
      height: 45px;
      margin: 0 auto 50px;
      border: 1px solid lightgray;
      border-radius: 30px;
      font-size: 18px;
      text-align: center;
      line-height: 45px;
    }
    :nth-of-type(2) {
      padding-top: 30px;
      border-top: 1px solid lightgray;
      margin-bottom: 50px;
      h3 {
        font-size: 25px;
      }
      span {
        margin-left: 10px;
        font-size: 25px;
      }
      textarea {
        width: 980px;
        height: 100px;
        margin-right: 50px;
        padding: 20px;
        font-size: 16px;
        background-color: #f5f5f5;
        border: 1px solid lightgray;
        overflow-y: scroll;
        :focus {
          outline: none;
        }
      }
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 980px;
        height: 50px;
        padding: 20px;
        padding-right: 0;
        background-color: #f5f5f5;
        border: 1px solid lightgray;

        button {
          width: 150px;
          height: 50px;
          font-size: 18px;
          color: #fff;
          background-color: #333;
          :hover {
            background-color: black;
          }
          transition: all 0.5s;
          cursor: pointer;
        }
      }
    }
  }
`;

const Info = styled.div`
  position: relative;
  width: 250px;
  text-align: center;
  border-right: 1px solid lightgray;
  border-left: 1px solid lightgray;
  > div :first-child {
    padding: 20px 30px;
    background-color: #f5f5f5;
    border-bottom: 1px solid lightgray;
    p {
      :nth-of-type(1) {
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;
      }
      :nth-of-type(2),
      :nth-of-type(3),
      :nth-of-type(4) {
        font-size: 14px;
        text-align: left;
        span {
          display: inline-block;
          width: 45px;
          margin-right: 10px;
          color: gray;
        }
      }
    }
  }
  > div:nth-of-type(2) {
    text-align: left;
    padding: 0 30px;
    p {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid lightgray;
    }
  }

  button {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    color: #fff;
    font-size: 18px;
    background-color: #333;
    :hover {
      background-color: black;
    }
    transition: all 0.5s;
    cursor: pointer;
  }
`;
