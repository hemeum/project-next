import styled from "styled-components";
import Link from "next/link";

function MainGuide() {
  const guideItems = [
    { id: 1, name: "#시즌2" },
    { id: 2, name: "#성장" },
    { id: 3, name: "#획득처" },
    { id: 4, name: "#원정대영지" },
    { id: 5, name: "#내실콘텐츠" },
  ];

  const guides = guideItems.map((item) => {
    return (
      <li key={item.id}>
        <Link href="/">
          <a>{item.name}</a>
        </Link>
      </li>
    );
  });

  const guideimgs = [
    { id: 6, src: "/img/guide-2.jpg" },
    { id: 7, src: "/img/guide-3.jpg" },
    { id: 8, src: "/img/guide-4.jpg" },
    { id: 9, src: "/img/guide-5.jpg" },
  ];

  const imgs = guideimgs.map((img) => {
    return (
      <li key={img.id}>
        <Link href="/">
          <a>
            <img src={img.src} alt="가이드 이미지"></img>
          </a>
        </Link>
      </li>
    );
  });

  return (
    <Guide>
      <h2>게임 가이드</h2>
      <GuideTop>
        <ul>{guides}</ul>
        <div>
          <input type="text" placeholder="검색어를 입력해주세요"></input>
          <i className="fas fa-search"></i>
        </div>
      </GuideTop>
      <GuideImgs>{imgs}</GuideImgs>
    </Guide>
  );
}

const Guide = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1260px;
  margin-top: 40px;
`;

const GuideTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  ul {
    display: flex;
    align-items: center;
    li {
      padding: 10px;
      margin-right: 20px;
      border: 1px solid lightgray;
      border-radius: 30px;
      :hover {
        border: 1px solid black;
      }
    }
  }
  div {
    position: relative;
    input {
      width: 350px;
      height: 50px;
      margin-left: 20px;
      padding-left: 10px;
      font-size: 16px;
      border: 2px solid lightgray;
      ::placeholder {
        font-weight: bold;
      }
      :focus {
        border: 2px solid black;
        outline: none;
      }
    }
    i {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      font-size: 20px;
    }
  }
`;

const GuideImgs = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  li {
    position: relative;
    :after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      background-color: black;
      opacity: 0;
      width: 100%;
      height: 99%;
    }
    :hover:after {
      opacity: 0.1;
    }
  }
`;

export default MainGuide;
