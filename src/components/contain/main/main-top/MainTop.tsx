import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

function MainTop() {
  const leftRef = useRef<HTMLDivElement>(null);

  const imgRef1 = useRef<HTMLImageElement>(null);
  const imgRef2 = useRef<HTMLImageElement>(null);
  const imgRef3 = useRef<HTMLImageElement>(null);
  const imgRef4 = useRef<HTMLImageElement>(null);
  const imgRef5 = useRef<HTMLImageElement>(null);
  const imgRef6 = useRef<HTMLImageElement>(null);

  const imgRefArr: any[] = [
    // 배열에 current로 담으면 useEffect에서 바로 참조 안됌
    imgRef1,
    imgRef2,
    imgRef3,
    imgRef4,
    imgRef5,
    imgRef6,
  ];

  const [zIndexs, setZIndexs] = useState([6, 5, 4, 3, 2, 1]); // 겹쳐놓은 이미지 슬라이드 인덱스 조절

  const [sels, setSels] = useState([true, false, false, false, false, false]); // 배열 요소에 따라 배너글자 색깔 바뀜

  useEffect(() => {
    let imgTopIndex;

    setTimeout(() => {
      // fade out 효과 함수
      const index = sels.indexOf(true);
      imgRefArr.forEach((c) => {
        if (c.current !== null) {
          console.log(sels);
          if (c.current === imgRefArr[index].current) {
            c.current.style.opacity = "0";
          } else {
            c.current.style.opacity = "1";
          }
        }
      });
    }, 4800);

    const bannerSlide = setInterval(() => {
      const newZIndexs = zIndexs.map((item) => {
        // 겹쳐놓은 이미지 zindex 변경
        if (item === 6) {
          item = 1;
        } else {
          item = item + 1;
        }
        return item;
      });

      imgTopIndex = newZIndexs.indexOf(6);

      setZIndexs(newZIndexs);

      const newSels = [false, false, false, false, false, false]; // 배너글자 색 변경
      newSels.splice(imgTopIndex, 1, true);
      setSels(newSels);
      if (imgTopIndex === 5) {
        imgTopIndex = 0;
      } else {
        imgTopIndex++;
      }
    }, 5000);

    if (sels.indexOf(true) === 2) {
    }

    return () => {
      clearInterval(bannerSlide);
    };
  }, [zIndexs, sels]);

  return (
    <Top>
      <Left ref={leftRef}>
        <img src="/img/banner-icon-new.png"></img>
        <Imgs zIndexs={zIndexs}>
          <ImgsItem ref={imgRef6} src="/img/banner-bg6.jpg"></ImgsItem>
          <ImgsItem ref={imgRef5} src="/img/banner-bg5.jpg"></ImgsItem>
          <ImgsItem ref={imgRef4} src="/img/banner-bg4.jpg"></ImgsItem>
          <ImgsItem ref={imgRef3} src="/img/banner-bg3.jpg"></ImgsItem>
          <ImgsItem ref={imgRef2} src="/img/banner-bg2.jpg"></ImgsItem>
          <ImgsItem ref={imgRef1} src="/img/banner-bg1.jpg"></ImgsItem>
        </Imgs>
        <BannerList>
          <div>
            <i className="fas fa-chevron-left"></i>
            <ul>
              <BannerItem sel={sels[0]}>banner1</BannerItem>
              <BannerItem sel={sels[1]}>banner2</BannerItem>
              <BannerItem sel={sels[2]}>banner3</BannerItem>
              <BannerItem sel={sels[3]}>banner4</BannerItem>
              <BannerItem sel={sels[4]}>banner5</BannerItem>
              <BannerItem sel={sels[5]}>banner6</BannerItem>
            </ul>
            <i className="fas fa-chevron-right"></i>
            <p>
              <span>{[...zIndexs].reverse()[0]}</span> / 6
            </p>
          </div>
        </BannerList>
      </Left>
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
    </Top>
  );
}

const Top = styled.div`
  position: absolute;
  top: 370px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Left = styled.div<{ ref: any }>`
  position: relative;
  width: 890px;
  height: 508px;
  margin-right: 10px;
  background-image: url("/img/banner-bg1.jpg");
  background-size: cover;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
  }
`;

const Imgs = styled.div<{ zIndexs: number[] }>`
  img {
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 200ms ease-out;
    :nth-of-type(6) {
      z-index: ${({ zIndexs }) => {
        return zIndexs[0];
      }};
    }
    :nth-of-type(5) {
      z-index: ${({ zIndexs }) => {
        return zIndexs[1];
      }};
    }
    :nth-of-type(4) {
      z-index: ${({ zIndexs }) => {
        return zIndexs[2];
      }};
    }
    :nth-of-type(3) {
      z-index: ${({ zIndexs }) => {
        return zIndexs[3];
      }};
    }
    :nth-of-type(2) {
      z-index: ${({ zIndexs }) => {
        return zIndexs[4];
      }};
    }
    :nth-of-type(1) {
      z-index: ${({ zIndexs }) => {
        return zIndexs[5];
      }};
    }
  }
`;

const ImgsItem = styled.img<{ ref: any }>``;

const BannerList = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: black;
  opacity: 0.7;
  z-index: 100;
  div {
    display: flex;
    align-items: center;
    height: 50px;
    color: #fff;
    font-size: 18px;
    color: lightgray;
    i {
      margin: 0 30px;
    }
    ul {
      display: flex;
      width: 650px;
      border: 1px solid #fff;
      overflow: hidden;
    }
    span {
      color: #fff;
    }
  }
`;

const BannerItem = styled.li<{ sel: boolean }>`
  flex: none;
  width: 110px;
  margin-right: 70px;
  text-align: center;
  cursor: pointer;
  :last-child {
    margin-right: 0;
  }
  ${({ sel }) => {
    return sel ? "color:red" : "color:#fff";
  }}
`;

const Right = styled.div`
  background-color: blue;
  width: 360px;
  height: 508px;
`;

export default MainTop;
