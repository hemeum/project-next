import styled from "styled-components";
import { useRouter } from "next/router";
import axios from "axios";

export interface InfoType {
  key?: number;
  title: string;
  content?: string;
  nickname: string;
  heart: number;
  view: number;
  reply: number;
  date: string;
  id: number;
  ctg: string;
  page: number;
}

export default function BoardInfo({
  title,
  content,
  nickname,
  heart,
  view,
  reply,
  date,
  id,
  ctg,
  page,
}: InfoType) {
  const router = useRouter();
  const searchText = router.query.searchText;
  const searchType = router.query.searchType;
  const orderType = router.query.orderType;

  const handleInfo = () => {
    axios.post("/post/add/view", { postId: id }).then((res) => {
      if (ctg === "공지사항") {
        router.push(
          {
            pathname: "/news/noticelist/view/[id]",
            query: {
              ctg: ctg,
              page: page,
              searchText: searchText ? searchText : "",
              searchType: searchType ? searchType : "",
              orderType:
                orderType === "최신순" || !orderType ? "최신순" : "좋아요순",
            },
          },
          `/news/noticelist/view/${res.data.postId}?ctg=${ctg}&page=${page}&searchType=${searchType}&searchText=${searchText}&orderType=${orderType}`,
        );
      } else {
        router.push(
          {
            pathname: "/community/freelist/view/[id]",
            query: {
              ctg: ctg,
              page: page,
              searchText: searchText ? searchText : "",
              searchType: searchType ? searchType : "",
              orderType:
                orderType === "최신순" || !orderType ? "최신순" : "좋아요순",
            },
          },
          `/community/freelist/view/${res.data.postId}?ctg=${ctg}&page=${page}&searchType=${searchType}&searchText=${searchText}&orderType=${orderType}`,
        );
      }
    });
  };

  return (
    <>
      {ctg === "공지사항" ? (
        <NewsInfo
          onClick={() => {
            handleInfo();
          }}
        >
          <div>
            <p>공지</p>
            <p>
              <span>{title}</span>
            </p>
            <p>{date}</p>
          </div>
        </NewsInfo>
      ) : (
        <Info
          onClick={() => {
            handleInfo();
          }}
        >
          <>
            <p>
              <span>{title}</span>
              <span>({reply})</span>
              <span>N</span>
            </p>
            <div>
              <img src="/img/logo-loa.png" alt="프로필 이미지" />
              <p>{nickname}</p>
            </div>
            <div>
              <i aria-hidden className="fa-solid fa-heart"></i>
              <p>{heart}</p>
            </div>
            <div>
              <i aria-hidden className="fa-solid fa-eye"></i>
              <p>{view}</p>
            </div>
            <p>{date}</p>
          </>
        </Info>
      )}
    </>
  );
}

const Info = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  :hover {
    background-color: #f5f5f5;
    span {
      border-bottom: 1px solid black;
    }
  }
  p:first-child {
    width: 650px;
    margin-left: 35px;
    span {
      padding-left: 5px;
      :first-child {
        padding-left: 0;
      }
    }
  }
  p:nth-of-type(2) {
    width: 100px;
    margin-right: 10px;
    text-align: center;
    color: gray;
  }
  div {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    :nth-of-type(1) {
      width: 200px;
      color: gray;
    }
    :nth-of-type(2),
    :nth-of-type(3) {
      width: 60px;
      i {
        margin-right: 10px;
        color: lightgray;
      }
      color: gray;
    }
  }
`;

const NewsInfo = styled.li`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  :hover {
    background-color: #f5f5f5;
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
`;
