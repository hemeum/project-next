import styled from "styled-components";

import LeftBanners from "./LeftBanners";
import RightBanners from "./RightBanners";

function MainTop() {
  return (
    <Top>
      <LeftBanners></LeftBanners>
      <RightBanners />
    </Top>
  );
}

const Top = styled.div`
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

export default MainTop;
