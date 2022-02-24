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
  listToggle: boolean;
  setListToggle: any;
  detailToggle: boolean;
  setDetailToggle: any;
  isPageNumber: number;
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
  listToggle,
  setListToggle,
  detailToggle,
  setDetailToggle,
  isPageNumber,
}: InfoType) {
  const router = useRouter();

  return (
    <Info
      onClick={() => {
        // 조회수 1 증가 후 이동
        axios.post("/post/add/view", { postId: id }).then((res) => {
          //setListToggle(!listToggle);
          //setDetailToggle(!detailToggle);
          router.push(
            {
              pathname: "/community/freelist/view/[id]",
              query: { ctg: ctg, page: isPageNumber },
            },
            `/community/freelist/view/${res.data.postId}?ctg=${ctg}&page=${isPageNumber}`,
          );
        });
      }}
    >
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
    </Info>
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
