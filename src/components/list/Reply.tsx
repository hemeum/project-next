import styled from "styled-components";
export default function Reply() {
  return (
    <Chat>
      <div>
        <img src="/img/logo-loa.png"></img>
      </div>
      <div>
        <div>
          <p>닉네임</p>
          <p>시간</p>
        </div>
        <p>내용</p>
      </div>
    </Chat>
  );
}

const Chat = styled.li`
  display: flex;
  align-items: center;
  width: 980px;
  margin-top: 30px;
  padding-bottom: 15px;
  border-bottom: 0.5px solid lightgray;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  > div {
    :nth-of-type(2) {
      width: 100%;
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      > p {
        margin-top: 5px;
      }
    }
  }
`;
