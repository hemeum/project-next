import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

function MainTop() {
  const leftRef = useRef<HTMLDivElement>(null);

  const boxRef = useRef<HTMLUListElement>(null);

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

  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    const fade = setTimeout(() => {
      // fade out 효과 함수

      const index = sels.indexOf(true);
      imgRefArr.forEach((c) => {
        if (c.current !== null) {
          if (c.current === imgRefArr[index].current) {
            // 현재 zindex의 배너이미지 오파시티 0으로 변경해주면서 fade 효과

            c.current.style.opacity = "0";
          } else {
            c.current.style.opacity = "1";
          }
        }
      });
    }, 4800);

    const bannerSlide = setInterval(() => {
      for (let i = 0; i < imgRefArr.length; i++) {
        // opacity 0으로 된거 다시 1로 싹 변경
        if (imgRefArr[i].current !== null) {
          imgRefArr[i].current.style.opacity = "1";
        }
      }
      let imgTopIndex;
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

      if (boxRef.current !== null) {
        // 3번째 사진부터 이동
        if (
          zIndexs[0] === 6 ||
          zIndexs[1] === 6 ||
          zIndexs[zIndexs.length - 2] === 6
        ) {
          // 트랜스레이트 이동X
          return;
        } else if (zIndexs[zIndexs.length - 1] === 6) {
          // 트랜스레이트 0으로 초기화
          boxRef.current.style.transform = `translateX(0px)`;
          setTranslate(0);
        } else {
          // 트랜스레이트 이동O
          boxRef.current.style.transform = `translateX(${-180 + translate}px)`;
          setTranslate(translate - 180);
        }
      }
    }, 5000);

    return () => {
      clearInterval(bannerSlide);
      clearTimeout(fade);
    };
  }, [zIndexs, sels, translate]);

  const handleBanner = (e: { currentTarget: any }) => {
    const banners = e.currentTarget.parentNode.childNodes;
    const selectIndex = [...banners].indexOf(e.currentTarget); // childNodes에 배열 메소드 사용할 땐 새 배열로 복제 해줘야함. 바로 사용 불가능.

    const newZIndexs = [...zIndexs];
    if (selectIndex === 0) {
      // 배너이미지 zIndex 변경
      newZIndexs.splice(selectIndex, 6, 6, 5, 4, 3, 2, 1);
      setZIndexs(newZIndexs);
    } else if (selectIndex === 1) {
      newZIndexs.splice(selectIndex, 5, 6, 5, 4, 3, 2);
      newZIndexs.splice(0, 1, 1);
      setZIndexs(newZIndexs);
    } else if (selectIndex === 2) {
      newZIndexs.splice(selectIndex, 4, 6, 5, 4, 3);
      newZIndexs.splice(0, 2, 2, 1);
      setZIndexs(newZIndexs);
    } else if (selectIndex === 3) {
      newZIndexs.splice(selectIndex, 3, 6, 5, 4);
      newZIndexs.splice(0, 3, 3, 2, 1);
      setZIndexs(newZIndexs);
    } else if (selectIndex === 4) {
      newZIndexs.splice(selectIndex, 4, 6, 5);
      newZIndexs.splice(0, 4, 4, 3, 2, 1);
      setZIndexs(newZIndexs);
    } else if (selectIndex === 5) {
      newZIndexs.splice(selectIndex, 5, 6);
      newZIndexs.splice(0, 5, 5, 4, 3, 2, 1);
      setZIndexs(newZIndexs);
    }

    const newSels = [false, false, false, false, false, false]; // 배너글자 색 변경
    newSels.splice(selectIndex, 1, true);
    setSels(newSels);

    if (boxRef.current !== null) {
      // 배너글자 클릭 시 트랜스레이트 이동 반경
      if (translate === 0) {
        if (selectIndex === 3) {
          boxRef.current.style.transform = `translateX(${-180}px)`;
          setTranslate(-180);
        }
      } else if (translate === -180) {
        if (selectIndex === 1 || selectIndex === 2) {
          boxRef.current.style.transform = `translateX(${180 + translate}px)`;
          setTranslate(translate + 180);
        } else if (selectIndex === 4) {
          boxRef.current.style.transform = `translateX(${-180 + translate}px)`;
          setTranslate(translate - 180);
        }
      } else if (translate === -360) {
        if (selectIndex === 3) {
          boxRef.current.style.transform = `translateX(${180 + translate}px)`;
          setTranslate(translate + 180);
        } else if (selectIndex === 2) {
          boxRef.current.style.transform = `translateX(${360 + translate}px)`;
          setTranslate(translate + 360);
        }
      }
    }
  };

  const handleBannerRArrow = () => {
    const newZIndexs = zIndexs.map((item) => {
      // 겹쳐놓은 이미지 zindex 변경
      if (item === 6) {
        item = 1;
      } else {
        item = item + 1;
      }
      return item;
    });
    setZIndexs(newZIndexs);

    let imgTopIndex;
    imgTopIndex = newZIndexs.indexOf(6);
    const newSels = [false, false, false, false, false, false];
    newSels.splice(imgTopIndex, 1, true); // 배너글자 색 변경
    setSels(newSels);

    if (boxRef.current !== null) {
      // 배너글자 클릭 시 트랜스레이트 이동 반경
      if (translate === 0) {
        if (imgTopIndex === 3) {
          boxRef.current.style.transform = `translateX(${-180}px)`;
          setTranslate(-180);
        }
      } else if (translate === -180) {
        if (imgTopIndex === 1 || imgTopIndex === 2) {
          boxRef.current.style.transform = `translateX(${180 + translate}px)`;
          setTranslate(translate + 180);
        } else if (imgTopIndex === 4) {
          boxRef.current.style.transform = `translateX(${-180 + translate}px)`;
          setTranslate(translate - 180);
        }
      } else if (translate === -360) {
        if (imgTopIndex === 3) {
          boxRef.current.style.transform = `translateX(${180 + translate}px)`;
          setTranslate(translate + 180);
        } else if (imgTopIndex === 2) {
          boxRef.current.style.transform = `translateX(${360 + translate}px)`;
          setTranslate(translate + 360);
        } else if (imgTopIndex === 0) {
          boxRef.current.style.transform = `translateX(${0}px)`;
          setTranslate(0);
        }
      }
    }
  };

  const handleBannerLArrow = () => {
    const newZIndexs = zIndexs.map((item) => {
      // 겹쳐놓은 이미지 zindex 변경
      if (item === 1) {
        item = 6;
      } else {
        item = item - 1;
      }
      return item;
    });
    setZIndexs(newZIndexs);

    let imgTopIndex; // 화살표 버튼 클릭 시 예상되는 index (현재 인덱스 X)
    imgTopIndex = newZIndexs.indexOf(6);
    const newSels = [false, false, false, false, false, false];
    newSels.splice(imgTopIndex, 1, true); // 배너글자 색 변경
    setSels(newSels);

    if (boxRef.current !== null) {
      // 배너글자 클릭 시 트랜스레이트 이동 반경
      if (translate === 0) {
        if (imgTopIndex === 3) {
          boxRef.current.style.transform = `translateX(${-180}px)`;
          setTranslate(-180);
        } else if (imgTopIndex === 5) {
          // 1번째 배너에서 < 클릭 시 맨 뒤 배너로 가기
          boxRef.current.style.transform = `translateX(${-360}px)`;
          setTranslate(-360);
        }
      } else if (translate === -180) {
        if (imgTopIndex === 1 || imgTopIndex === 2) {
          boxRef.current.style.transform = `translateX(${180 + translate}px)`;
          setTranslate(translate + 180);
        } else if (imgTopIndex === 4) {
          boxRef.current.style.transform = `translateX(${-180 + translate}px)`;
          setTranslate(translate - 180);
        }
      } else if (translate === -360) {
        if (imgTopIndex === 3) {
          boxRef.current.style.transform = `translateX(${180 + translate}px)`;
          setTranslate(translate + 180);
        } else if (imgTopIndex === 2) {
          boxRef.current.style.transform = `translateX(${360 + translate}px)`;
          setTranslate(translate + 360);
        }
      }
    }
  };

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
            <i className="fas fa-chevron-left" onClick={handleBannerLArrow}></i>
            <div>
              <BannerItembox ref={boxRef}>
                <BannerItem sel={sels[0]} onClick={handleBanner}>
                  banner1
                </BannerItem>
                <BannerItem sel={sels[1]} onClick={handleBanner}>
                  banner2
                </BannerItem>
                <BannerItem sel={sels[2]} onClick={handleBanner}>
                  banner3
                </BannerItem>
                <BannerItem sel={sels[3]} onClick={handleBanner}>
                  banner4
                </BannerItem>
                <BannerItem sel={sels[4]} onClick={handleBanner}>
                  banner5
                </BannerItem>
                <BannerItem sel={sels[5]} onClick={handleBanner}>
                  banner6
                </BannerItem>
              </BannerItembox>
            </div>
            <i
              className="fas fa-chevron-right"
              onClick={handleBannerRArrow}
            ></i>
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
  i {
    cursor: pointer;
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
  > div {
    display: flex;
    align-items: center;
    height: 50px;
    color: #fff;
    font-size: 18px;
    color: lightgray;
    i {
      margin: 0 30px;
    }
    div {
      width: 650px;
      border: 1px solid #fff;
      overflow: hidden;
    }

    span {
      color: #fff;
    }
  }
`;

const BannerItembox = styled.ul<{ ref: any }>`
  display: flex;
  width: 1010px;
  transition: transform 500ms ease;
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
