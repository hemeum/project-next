import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import styled from "styled-components";

function RightBanners() {
  const [zIndexs, setZIndexs] = useState([3, 2, 1]);

  const imgRef1 = useRef<HTMLLIElement>(null);
  const imgRef2 = useRef<HTMLLIElement>(null);
  const imgRef3 = useRef<HTMLLIElement>(null);
  const imgRefArr: any[] = [imgRef1, imgRef2, imgRef3];

  useEffect(() => {
    imgRefArr.forEach((img, i) => {
      if (img.current !== null) {
        img.current.style.opacity = "1";
        img.current.style.zIndex = `${zIndexs[i]}`;
      }
    });
  }, [zIndexs]);

  const imgData = [
    { id: 1, src: "/img/right-banner1.jpg" },
    { id: 2, src: "/img/right-banner2.jpg" },
    { id: 3, src: "/img/right-banner3.jpg" },
  ];
  const imgList = imgData.map((img) => {
    return (
      <li key={img.id} ref={imgRefArr[img.id - 1]}>
        <img src={img.src} alt="배너이미지"></img>
      </li>
    );
  });

  const handleLArrow = (e: { currentTarget: any }) => {
    let clickZIndex = e.currentTarget.parentNode.childNodes[1].innerHTML; // 노드 요소의 HTML을 알 수 있음
    console.log(clickZIndex);
    if (imgRefArr[clickZIndex - 1].current !== null) {
      if (clickZIndex - 1 === 0) {
        console.log(1);
        imgRefArr[2].current.style.zIndex = "3";
      } else if (clickZIndex - 1 === 1) {
        imgRefArr[0].current.style.zIndex = "3";
      } else if (clickZIndex - 1 === 2) {
        imgRefArr[1].current.style.zIndex = "3";
      }
      imgRefArr[clickZIndex - 1].current.style.opacity = "0";
    }
    setTimeout(() => {
      const newZIndexs = zIndexs.map((item) => {
        // 겹쳐놓은 이미지 zindex 변경
        if (item === 1) {
          item = 3;
        } else {
          item = item - 1;
        }
        return item;
      });
      setZIndexs(newZIndexs);
    }, 300);
  };
  const handleRArrow = (e: { currentTarget: any }) => {
    let clickZIndex = e.currentTarget.parentNode.childNodes[1].innerHTML; // 노드 요소의 HTML을 알 수 있음
    console.log(clickZIndex);
    if (imgRefArr[clickZIndex - 1].current !== null) {
      imgRefArr[clickZIndex - 1].current.style.opacity = "0";
    }
    setTimeout(() => {
      const newZIndexs = zIndexs.map((item) => {
        // 겹쳐놓은 이미지 zindex 변경
        if (item === 3) {
          item = 1;
        } else {
          item = item + 1;
        }
        return item;
      });
      setZIndexs(newZIndexs);
    }, 300);
  };

  return (
    <Right>
      <RightSlide zIndexs={zIndexs}>
        <ul>{imgList}</ul>
        <ArrowBox>
          <div>
            <i className="fas fa-chevron-left" onClick={handleLArrow}></i>
            <span>{[...zIndexs].reverse()[0]}</span>
            <span>/</span>3
            <i className="fas fa-chevron-right" onClick={handleRArrow}></i>
          </div>
        </ArrowBox>
      </RightSlide>
      <NoticeBox>
        <h3>공지사항</h3>
        <ul>
          <li>
            <div>●</div>
            <Link href="/">
              <a>1월 19일(수) 정기 점검 안내</a>
            </Link>
          </li>
          <li>
            <div>●</div>
            <Link href="/">
              <a>[정상화] 공식 홈페이지 전투정보실 페이지</a>
            </Link>
          </li>
          <li>
            <div>●</div>
            <Link href="/">
              <a>1월 13일(목) 로스트아크 임시 점검 완료 안내</a>
            </Link>
          </li>
          <li>
            <div>●</div>
            <Link href="/">
              <a>1월 13일(목) 로스트아크 임시 점검 안내</a>
            </Link>
          </li>
        </ul>
        <Link href="/">
          <a>
            <i className="fas fa-plus"></i>
          </a>
        </Link>
      </NoticeBox>
    </Right>
  );
}

const Right = styled.div`
  width: 360px;
  height: 508px;
`;

const RightSlide = styled.div<{ zIndexs: number[] }>`
  position: relative;
  width: 100%;
  height: 280px;
  li {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    :nth-of-type(1) {
      transition: opacity 300ms ease-out;
      ${({ zIndexs }) => {
        return `z-index:${zIndexs[0]}`;
      }}
    }
    :nth-last-of-type(2) {
      transition: opacity 300ms ease-out;
      ${({ zIndexs }) => {
        return `z-index:${zIndexs[1]}`;
      }}
    }
    :nth-of-type(3) {
      transition: opacity 300ms ease-out;
      ${({ zIndexs }) => {
        return `z-index:${zIndexs[2]}`;
      }}
    }
  }
`;

const ArrowBox = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 35px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;

  div {
    font-size: 14px;
    color: gray;
    line-height: 35px;
    text-align: center;
    span {
      margin-right: 3px;
      color: #fff;
      :nth-of-type(2) {
        color: gray;
      }
    }
    i {
      margin: 0 12px;
      color: #fff;
      opacity: 0.9;
      transition: opacity 0.5s;
      :hover {
        opacity: 1;
      }
      cursor: pointer;
    }
  }
`;

const NoticeBox = styled.div`
  position: relative;
  width: 100%;
  height: 228px;
  padding: 30px 20px;
  background-color: #2f3239;
  > a {
    position: absolute;
    top: 30px;
    right: 20px;
    color: lightgray;
    font-size: 20px;
  }
  h3 {
    color: #fff;
    margin-bottom: 20px;
  }
  ul {
    li {
      width: 90%;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      font-size: 15px;
      color: lightgray;
      height: 22px;
      div {
        color: lightgray;
        margin-right: 10px;
        height: 22px;
      }
      a {
        height: 22px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        :hover {
          border-bottom: 1px solid lightgray;
        }
      }
      :last-child {
        margin-bottom: 0px;
      }
    }
  }
`;

export default RightBanners;
