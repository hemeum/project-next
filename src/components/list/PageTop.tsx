import styled from "styled-components";
import Header from "../contain/header/Header";

export default function PageTop() {
  return (
    <>
      <Header></Header>
      <Bg></Bg>
    </>
  );
}

const Bg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 380px;
  background-image: url("/img/list-banner-1.jpg");
  background-size: cover;
  background-position: center center;
`;
