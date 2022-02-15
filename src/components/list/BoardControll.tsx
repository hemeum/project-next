import styled from "styled-components";

export default function BoardControll() {
  return (
    <Controll>
      <i aria-hidden className="fa-solid fa-angle-left"></i>
      <div>
        <p className="active">1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
      </div>
      <i aria-hidden className="fa-solid fa-angle-right"></i>
    </Controll>
  );
}

const Controll = styled.div`
  width: 520px;
  margin: 0 auto 80px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  i {
    width: 40px;
    height: 40px;
    border: 1px solid lightgray;
    line-height: 40px;
    color: lightgray;
    font-size: 20px;
    cursor: pointer;
    :hover {
      color: black;
      border: 1px solid black;
    }
    transition: all 0.2s;
  }
  div {
    display: flex;
    align-items: center;
    p {
      width: 40px;
      height: 40px;
      line-height: 40px;
      color: lightgray;
      font-size: 18px;
      cursor: pointer;
      :hover {
        color: #fff;
        background-color: lightgray;
      }
    }
    .active {
      color: #fff;
      background-color: #333;
    }
  }
`;
