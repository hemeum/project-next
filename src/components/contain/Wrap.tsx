import Header from "src/components/contain/header/Header";

import styled from "styled-components";

function Wrap() {
  return (
    <WrapBg>
      <Header></Header>
    </WrapBg>
  );
}

const WrapBg = styled.div`
  min-width: 1200px;
  height: 1000px;
  background-image: url("/img/main-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export default Wrap;
