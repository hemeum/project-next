import styled from "styled-components";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { debounce } from "lodash";

import PageTop from "./PageTop";
import Footer from "../contain/footer/Footer";
import TitleTop from "./TitleTop";
import { Router } from "express";

const PostEditor = dynamic(() => import("./PostEditor"), { ssr: false });

export default function Write() {
  const router: any = useRouter();
  const ctg = router.query.ctg;
  const prevTitle = router.query.title;
  const prevContent = router.query.value;
  const prevPostId = router.query.postId;

  const { nickname } = useSelector((state: any) => {
    return state.authReducer;
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log(prevContent, prevTitle);
    if (prevTitle && prevContent) {
      setTitle(prevTitle);
      setContent(prevContent); // toast-ui의 입력값이 content로 지정되어야 함.
      // prevPostId로 수정해주기
    }
  }, []);

  const handleSubmit = debounce((e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (prevTitle && prevContent) {
      axios
        .post("/api/post/edit", {
          postId: prevPostId,
          title: title,
          content: content,
        })
        .then((res) => {
          if (ctg === "자유게시판") {
            router.push(
              {
                pathname: `/community/freelist/view/[id]`,
                query: { ctg: ctg, postId: res.data.postId },
              },
              `/community/freelist/view/${res.data.postId}?ctg=${ctg}`,
            );
          }
        });
    } else {
      axios
        .post("/api/post/add", {
          nickname: nickname,
          category: ctg,
          title: title,
          content: content,
        })
        .then((res) => {
          if (ctg === "자유게시판") {
            router.push(
              {
                pathname: `/community/freelist/view/[id]`,
                query: { ctg: ctg, postId: res.data.postId },
              },
              `/community/freelist/view/${res.data.postId}?ctg=${ctg}`,
            );
          }
        });
    }
  }, 500);

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
            value={title}
          ></EditorTitle>
          <PostEditor setContent={setContent} content={content}></PostEditor>
          <ButtonBox>
            <button type="button" onClick={handleSubmit}>
              확인
            </button>
            <button
              type="button"
              onClick={() => {
                router.push({
                  pathname: "/community/freelist",
                  query: { ctg: ctg },
                });
              }}
            >
              취소
            </button>
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
