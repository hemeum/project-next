import styled from "styled-components";
import { useRef, useState, useEffect, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import { debounce } from "lodash";

import PageTop from "./PageTop";
import Footer from "./../contain/footer/Footer";
import TitleTop from "./TitleTop";
import BoardList from "./BoardList";
import Reply from "./Reply";

export default function Detail() {
  const isLogin = useSelector((state: any) => {
    return state.authReducer.isLogin;
  });
  const nickname = useSelector((state: any) => {
    return state.authReducer.nickname;
  });

  const router = useRouter();
  const ctg = router.query.ctg;
  const postId = router.query.id;
  const page = router.query.page;

  const mainRef: any = useRef();
  const replyRef: any = useRef();

  const [detailToggle, setDetailToggle] = useState(false); // detail 새로 받아오기 위한 토글
  const [heartLeng, setHeartLeng] = useState(0);
  const [isHeart, setIsHeart] = useState(false);
  const [reply, setReply] = useState("");
  const [replyLength, setReplyLength] = useState(0);
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
    setHeight(mainRef.current.clientHeight);
  }, [detail, postId, height, replyLength]);

  useEffect(() => {
    axios.post("/api/post/detail", { postId: postId }).then((res) => {
      /*const date = moment(res.data.date).format("YYYY년 M월 D일 HH:mm");
      res.data.date = date;*/
      setDetail(res.data);
      setReplyLength(res.data.reply);
      setHeartLeng(res.data.heart);
    });
  }, [postId, height, heartLeng, detailToggle]);

  const submitReply = debounce(() => {
    if (isLogin) {
      axios
        .post("/api/post/reply/add", {
          reply: reply,
          nickname: nickname,
          postId: postId,
        })
        .then(() => {
          setReplyLength(replyLength + 1);
          setReply("");
          setHeight(height + 63);
        });
    } else {
      const yesLogin = confirm("로그인이 필요합니다.");
      if (yesLogin) {
        router.push("/user/login");
      } else {
        return;
      }
    }
  }, 500);

  const handleReply = (e: any) => {
    if (isLogin) {
      if (e.target.value.length > 200) {
        return;
      } else {
        setReply(e.target.value);
      }
    } else {
      const yesLogin = confirm("로그인이 필요합니다.");
      if (yesLogin) {
        router.push("/user/login");
      } else {
        return;
      }
    }
  };

  const handleHeart = debounce(() => {
    if (isLogin) {
      if (!isHeart) {
        axios
          .post("/api/post/heart/add", { postId: postId, nickname: nickname })
          .then((res) => {
            setIsHeart(res.data.isHeart);
            setHeartLeng(heartLeng + 1);
          });
      } else {
        axios
          .post("/api/post/heart/delete", {
            postId: postId,
            nickname: nickname,
          })
          .then((res) => {
            setIsHeart(res.data.isHeart);
            setHeartLeng(heartLeng - 1);
          });
      }
    } else {
      const yesLogin = confirm("로그인이 필요합니다.");
      if (yesLogin) {
        router.push("/user/login");
      } else {
        return;
      }
    }
  }, 500);

  const handlePostDelete = () => {
    const yesDelete = confirm("정말 삭제하시겠습니까?");
    if (yesDelete) {
      axios.post("/api/post/delete", { postId: postId }).then(() => {
        router.push({ pathname: "/community/freelist", query: { ctg: ctg } });
      });
    } else {
      return;
    }
  };

  const handlePostEdit = () => {
    const yesEdit = confirm("수정하시겠습니까?");
    if (yesEdit) {
      router.push({
        pathname: "/community/freewrite",
        query: {
          ctg: ctg,
          title: detail.title,
          value: detail.content,
          postId: postId,
        },
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    axios
      .post("/api/post/heart", { postId: postId, nickname: nickname })
      .then((res) => {
        setIsHeart(res.data.isHeart);
      });
  }, [isHeart, postId]);

  const changeDate = (detailDate: any) => {
    const date = moment(detailDate).format("YYYY년 M월 D일 HH:mm");
    return date;
  };

  return (
    <>
      <Wrap height={height}>
        <PageTop></PageTop>
        <DetailMain ref={mainRef}>
          <TitleTop></TitleTop>
          <Content>
            <Text>
              <h3>{detail.title}</h3>
              <p>{changeDate(detail.date)}</p>
              <p>{detail.content}</p>

              {detail.nickname === nickname ? (
                <ButtonBox>
                  <button type="button" onClick={handlePostEdit}>
                    수정
                  </button>
                  <span>|</span>
                  <button type="button" onClick={handlePostDelete}>
                    삭제
                  </button>
                </ButtonBox>
              ) : (
                <HeartBox>
                  <I
                    aria-hidden
                    className="fa-solid fa-heart"
                    onClick={handleHeart}
                    isHeart={isHeart}
                  ></I>
                  <span>{detail.heart}</span>
                </HeartBox>
              )}

              <div>
                <h3>
                  댓글<span>{replyLength}</span>
                </h3>
                <textarea
                  placeholder="저작권 침해는 제한됩니다."
                  value={reply}
                  onChange={handleReply}
                  ref={replyRef}
                ></textarea>
                <div>
                  <p>{reply.length === 0 ? 0 : reply.length} / 200</p>
                  <button type="button" onClick={submitReply}>
                    등록
                  </button>
                </div>
                {replyLength === 0 ? undefined : (
                  <ul>
                    <Reply
                      postId={postId}
                      replyLength={replyLength}
                      setReplyLength={setReplyLength}
                      height={height}
                      setHeight={setHeight}
                    ></Reply>
                  </ul>
                )}
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
                  댓글 <span>{replyLength}</span>
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
          <BoardList
            ctg={ctg}
            detailToggle={detailToggle}
            setDetailToggle={setDetailToggle}
            page={page}
          ></BoardList>
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
    return `${height + 480}px`;
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
      > textarea {
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

const I = styled.i<{ isHeart: boolean }>`
  ${({ isHeart }) => {
    return isHeart ? "color:red" : "color:black";
  }};
  margin-right: 5px;
  transition: all 0.5s;
  cursor: pointer;
`;

const HeartBox = styled.div`
  width: 110px;
  height: 45px;
  margin: 0 auto 50px;
  border: 1px solid lightgray;
  border-radius: 30px;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
  margin-right: 50px;
  button {
    color: gray;
    font-weight: bold;
    :hover {
      color: black;
    }
    transition: all 0.2s;
    cursor: pointer;
  }
  span {
    color: gray;
    margin: 0 10px;
  }
`;
