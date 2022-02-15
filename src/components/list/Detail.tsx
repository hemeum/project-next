import styled from "styled-components";

import ListTop from "./ListTop";

export default function Detail() {
  return (
    <Wrap>
      <ListTop></ListTop>
      <DetailMain></DetailMain>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  min-width: 1300px;
  height: 1500px;
`;

const DetailMain = styled.div`
  position: absolute;
  top: 380px;
  left: 50%;
  transform: translateX(-50%);
  width: 1280px;
  margin-top: 50px;
`;
