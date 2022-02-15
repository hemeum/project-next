import styled from "styled-components";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import ListTop from "./ListTop";
import Footer from "../contain/footer/Footer";

const PostEditor = dynamic(() => import("./PostEditor"), { ssr: false });

export default function Write() {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <Wrap>
        <ListTop></ListTop>
        <EditorBox>
          <EditorTop>
            <h2>
              {router.pathname === "/community/freewrite"
                ? "자유 게시판"
                : undefined}
            </h2>
            <GoBack>
              <i aria-hidden className="fa-solid fa-bars"></i>
              <p>목록가기</p>
            </GoBack>
          </EditorTop>
          <EditorTitle placeholder="제목을 입력해주세요."></EditorTitle>
          <PostEditor></PostEditor>
          <ButtonBox>
            <button type="button">확인</button>
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

const EditorTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 3px solid black;
`;

const GoBack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  padding: 5px 15px;
  border: 1px solid lightgray;
  font-weight: bold;
  cursor: pointer;
  i {
    margin-right: 5px;
  }
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
