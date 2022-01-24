import MainTop from "./main-top/MainTop";
import MainSearch from "./main-search/MainSearch";
import MainRow from "./main-row/MainRow";
import MainVideo from "./main-video/MainVideo";

import styled from "styled-components";

function Main({ scroll }: { scroll: number }) {
  // main-top-box에게 높이주고, 그 안에 MainTop은 박스 안에서 포지션으로 위치
  return (
    <div>
      <div>
        <div>
          <MainTopBox>
            <MainTop scroll={scroll}></MainTop>
          </MainTopBox>
          <MainSearchBox>
            <MainSearch></MainSearch>
          </MainSearchBox>
          <MainRowBox>
            <MainRow></MainRow>
          </MainRowBox>
          <MainVideoBox>
            <MainVideo></MainVideo>
          </MainVideoBox>
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
  height: 920px;
`;

const MainSearchBox = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
`;

const MainRowBox = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 470px;
`;

const MainVideoBox = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 800px;
  background-color: #c0c0c0;
`;

export default Main;
