import MainTop from "./main-top/MainTop";
import MainSearch from "./main-search/MainSearch";
import MainRow from "./main-row/MainRow";
import MainVideo from "./main-video/MainVideo";
import MainGuide from "./main-guide/MainGuide";
import MainContents from "./main-contents/MainContents";
import Footer from "../footer/Footer";

import styled from "styled-components";

function Main({ scroll, youtubeList }: { scroll: number; youtubeList: [] }) {
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
            <MainVideo youtubeList={youtubeList}></MainVideo>
          </MainVideoBox>
          <MainGuideBox>
            <MainGuide></MainGuide>
          </MainGuideBox>
          <MainConBox>
            <MainContents />
          </MainConBox>
        </div>
        <Footer></Footer>
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
  height: 830px;
  background-color: #e9e9e9;
`;

const MainGuideBox = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 440px;
`;

const MainConBox = styled.div`
  display: flex;
  width: 100%;
  height: 600px;
`;

export default Main;
