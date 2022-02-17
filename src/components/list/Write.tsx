import styled from "styled-components";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import PageTop from "./PageTop";
import Footer from "../contain/footer/Footer";
import TitleTop from "./TitleTop";

const PostEditor = dynamic(() => import("./PostEditor"), { ssr: false });

export default function Write() {
  const router: any = useRouter();
  const { nickname } = useSelector((state: any) => {
    return state.authReducer;
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post("/post/add", {
        nickname: nickname,
        category: router.query.ctg,
        title: title,
        content: content,
      })
      .then((res) => {
        if (router.query.ctg === "자유게시판") {
          console.log(res.data.postId);
          router.push(
            {
              pathname: `/community/freelist/view/[id]`,
              query: { ctg: router.query.ctg, postId: res.data.postId },
            },
            `/community/freelist/view/${res.data.postId}`,
          );
        }
      });
  };

  return (
    <>
      <Wrap>
        <PageTop></PageTop>
        <EditorBox>
          <TitleTop />
          <EditorTitle
            placeholder="제목을 입력해주세요."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></EditorTitle>
          <PostEditor setContent={setContent}></PostEditor>
          <ButtonBox>
            <button type="button" onClick={handleSubmit}>
              확인
            </button>
            <button type="button">취소</button>
          </ButtonBox>
        </EditorBox>
      </Wrap>
      <Footer></Footer>
    </>
  );
}

const Wrap = styled.div`
  position: relative;
  min-width: 1300px;
  height: 1280px;
`;

const EditorBox = styled.div`
  position: absolute;
  top: 380px;
  left: 50%;
  transform: translateX(-50%);
  width: 1280px;
  margin-top: 50px;
  padding-bottom: 20px;
`;

const EditorTitle = styled.input`
  width: 100%;
  height: 60px;
  margin: 10px 0;
  padding-left: 20px;
  font-size: 20px;
  background-color: #f5f5f5;
  border: 1px solid lightgray;
  :focus {
    outline: none;
  }
`;

const ButtonBox = styled.div`
  width: 350px;
  margin: 30px auto 0;
  button {
    width: 165px;
    height: 50px;
    font-size: 16px;
    cursor: pointer;
    :first-child {
      background-color: #333;
      color: #fff;
      margin-right: 20px;
    }
    :last-child {
      border: 1px solid lightgray;
      color: black;
    }
  }
`;
