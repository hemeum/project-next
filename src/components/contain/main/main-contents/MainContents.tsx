import styled from "styled-components";
import Link from "next/link";
import ContentsRight from "./ContentsRight";

function MainContents() {
  const conLeftImgs = [
    { id: 1, src: "/img/con-left-1.jpg" },
    { id: 2, src: "/img/con-left-2.jpg" },
    { id: 3, src: "/img/con-left-3.jpg" },
    { id: 4, src: "/img/con-left-4.jpg" },
    { id: 5, src: "/img/con-left-5.jpg" },
    { id: 6, src: "/img/con-left-6.jpg" },
    { id: 7, src: "/img/con-left-7.jpg" },
    { id: 8, src: "/img/con-left-8.jpg" },
    { id: 9, src: "/img/con-left-9.jpg" },
  ];

  const leftImgs = conLeftImgs.map((img) => {
    return (
      <li key={img.id}>
        <Link href="/">
          <a>
            <img src={img.src} alt="컨텐츠 이미지"></img>
          </a>
        </Link>
      </li>
    );
  });

  return (
    <>
      <ContentsLeft>
        <LeftBox>
          <h2>콘텐츠</h2>
          <ul>{leftImgs}</ul>
          <Link href="/">
            <a>
              <i className="fas fa-plus"></i>
            </a>
          </Link>
        </LeftBox>
      </ContentsLeft>
      <ContentsRight></ContentsRight>
    </>
  );
}

const ContentsLeft = styled.div`
  position: relative;
  width: 50%;
  height: 523px;
  margin-top: 77px;
  background-image: url("/img/con-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right center;
`;

const LeftBox = styled.div`
  position: absolute;
  top: 50%;
  right: 50px;
  transform: translateY(-50%);
  i {
    position: absolute;
    top: 10px;
    right: 0;
    font-size: 20px;
    color: #fff;
    :hover {
      color: black;
    }
  }
  h2 {
    margin-bottom: 20px;
    color: #fff;
  }
  ul {
    width: 545px;
    li {
      float: left;
      margin-bottom: 10px;
      margin-right: 10px;
      :nth-of-type(3),
      :nth-of-type(6),
      :nth-of-type(9) {
        margin-right: 0;
      }
      :nth-of-type(7),
      :nth-of-type(8),
      :nth-of-type(9) {
        margin-bottom: 0;
      }
    }
  }
`;

export default MainContents;
