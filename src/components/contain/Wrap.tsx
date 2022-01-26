import Header from "src/components/contain/header/Header";
import Main from "src/components/contain/main/Main";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { throttle } from "lodash";

function Wrap() {
  const [scroll, setScroll] = useState(0);

  const handleScroll = throttle(() => {
    if (window.scrollY < 100) {
      setScroll(window.scrollY);
    }
  }, 200);

  useEffect(() => {
    // throttle은 debounce와 달리 이벤트가 바로 실행되었다가 몇초 간격으로 다시 실행해주는 것이기 때문에, 빈배열에 scroll을 넣어주게 되면, 연속적으로 계속 실행하는 것과 같다. 따라서 비워주자.
    setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <WrapAll>
      <Header scroll={scroll}></Header>
      <WrapMain>
        <Main scroll={scroll}></Main>
      </WrapMain>
      <Bg></Bg>
    </WrapAll>
  );
}

const WrapAll = styled.div`
  /*WrapAll에서 header와 main이 높이를 나눠가지고, zindex로 높이 뛰움. 그 zindex보다 낮게 bg를 뛰워서 배경이미지를 줬다. 포지션 sticky때문에 이렇게 함. 단점은 부모인 All에게 height를 고정으로 줘야함.*/
  position: relative;
  min-width: 1300px;
  height: 3400px;
`;

const WrapMain = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 100;
  width: 100%;
`;

const Bg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1000px;
  background-image: url("/img/main-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export default Wrap;
