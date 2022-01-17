import styled from "styled-components";

function RightBanners() {
  return (
    <Right>
      <div>
        <div>
          <i></i>
          <p></p>
          <i></i>
        </div>
      </div>
      <div>
        <h3></h3>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <i></i>
      </div>
    </Right>
  );
}

const Right = styled.div`
  background-color: blue;
  width: 360px;
  height: 508px;
`;

export default RightBanners;
