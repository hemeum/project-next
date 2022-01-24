import Header from "src/components/contain/header/Header";
import Main from "src/components/contain/main/Main";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { throttle } from "lodash";

function Wrap() {
  const [scroll, setScroll] = useState(0);

  const handleScroll = throttle(() => {
    console.log("scroll", scroll);
    setScroll(window.scrollY);
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
    <WrapBg>
      <Header scroll={scroll}></Header>
      <Main scroll={scroll}></Main>
    </WrapBg>
  );
}

const WrapBg = styled.div`
  position: relative;
  min-width: 1300px;
  height: 1000px;
  background-image: url("/img/main-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export default Wrap;
