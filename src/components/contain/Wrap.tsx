import Header from "src/components/contain/header/Header";
import Main from "src/components/contain/main/Main";

import styled from "styled-components";

function Wrap() {
  return (
    <WrapBg>
      <Header></Header>
      <Main></Main>
    </WrapBg>
  );
}

const WrapBg = styled.div`
  position: relative;
  min-width: 1300px;
  height: 1000px;
  background-image: url("/img/main-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export default Wrap;
