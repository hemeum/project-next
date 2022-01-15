import MainTop from "src/components/contain/main/main-top/MainTop";

import styled from "styled-components";

function Main() {
  // main-top-box에게 높이주고, 그 안에 MainTop은 박스 안에서 포지션으로 위치
  return (
    <div>
      <div>
        <div>
          <MainTopBox className="main-top-box">
            <MainTop></MainTop>
          </MainTopBox>
          <div className="main-search"></div>
          <div className="main-notice"></div>
          <div className="main-video"></div>
          <div className="main-guide"></div>
          <div className="main-cons"></div>
        </div>
        <aside></aside>
        <button></button>
        <div>
          <img src=""></img>
        </div>
      </div>
    </div>
  );
}

const MainTopBox = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 1300px;
`;

export default Main;
