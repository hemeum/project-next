import axios from "axios";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

export default function BoardControll({ setList, ctg }: any) {
  const [listLength, setListLength] = useState([]); // post 갯수 10개당 1요소로 배열로 가져오기위함
  const [pageNumbers, setPageNumbers] = useState([]); // post 갯수에 맞게 page number 요소와 갯수 설정하기 위함
  const [active, setActive] = useState("false"); // arrow 버튼 클릭 시 className active 유동적이게 바꾸기 위함

  const lastPRef: any = useRef();
  const firstPRef: any = useRef();

  useEffect(() => {
    axios.post("/post/length", { category: ctg }).then((res) => {
      const leng = res.data.leng;
      const arr: any = [];
      for (let i = 1; i <= Math.ceil(leng / 10); i++) {
        arr.push(i);
      }
      const newArr: any = [...arr];
      setListLength(arr);
      setPageNumbers(newArr.splice(0, 10));
      // active만 조정 - 생각해보자
    });
  }, []);

  const handleList = (e: any) => {
    const child = [...e.target.parentNode.childNodes];
    child.forEach((node) => {
      if (node.className === "active") {
        node.classList.replace("active", "not-active");
        return;
      }
    });
    e.target.classList.replace("not-active", "active");

    const order = Number(e.target.innerText);
    axios.post("/post/list", { order: order }).then((res) => {
      setList(res.data);
    });
  };

  const handleLeftArrowList = () => {
    if (pageNumbers[0] === 1) {
      return;
    }

    setPageNumbers([...listLength].splice(pageNumbers[0] / 10 - 1, 10));

    if (lastPRef.current !== null) {
      const child = [...lastPRef.current.parentNode.childNodes];
      child.forEach((node) => {
        if (node.className === "active") {
          node.classList.replace("active", "not-active");
          return;
        }
      });
      lastPRef.current.classList.replace("not-active", "active");

      const order = Number(lastPRef.current.innerText) - 1;
      axios.post("/post/list", { order: order }).then((res) => {
        setList(res.data);
      });
    }

    localStorage.setItem("left", "true");
    const cln: any = localStorage.getItem("left");
    setActive(cln);
  };

  const handleRightArrowList = () => {
    /*const newNumber: any = pageNumbers.map((num) => {
      return num + 10;
    });*/
    if (pageNumbers.length < 10) {
      return;
    }

    setPageNumbers([...listLength].splice(pageNumbers[0] * 10, 10));

    if (firstPRef.current !== null) {
      const child = [...firstPRef.current.parentNode.childNodes];
      child.forEach((node) => {
        if (node.className === "active") {
          node.classList.replace("active", "not-active");
          return;
        }
      });
      firstPRef.current.classList.replace("not-active", "active");
      const order = Number(firstPRef.current.innerText) + 10;
      axios.post("/post/list", { order: order }).then((res) => {
        setList(res.data);
      });
    }

    localStorage.setItem("right", "false");
    const cln: any = localStorage.getItem("right");
    setActive(cln);
  };

  const numbers = pageNumbers.map((i) => {
    if (pageNumbers.length === 1) {
      return (
        <p key={i} ref={lastPRef} className="active" onClick={handleList}>
          {i}
        </p>
      );
    } else if (i === pageNumbers[0] && active === "false") {
      return (
        <p key={i} ref={firstPRef} className="active" onClick={handleList}>
          {i}
        </p>
      );
    } else if (i === pageNumbers[0] && active === "true") {
      return (
        <p key={i} ref={firstPRef} className="not-active" onClick={handleList}>
          {i}
        </p>
      );
    } else if (
      i === pageNumbers[pageNumbers.length - 1] &&
      active === "false"
    ) {
      return (
        <p key={i} ref={lastPRef} className="not-active" onClick={handleList}>
          {i}
        </p>
      );
    } else if (i === pageNumbers[pageNumbers.length - 1] && active === "true") {
      return (
        <p key={i} ref={lastPRef} className="active" onClick={handleList}>
          {i}
        </p>
      );
    } else {
      return (
        <p key={i} className="not-active" onClick={handleList}>
          {i}
        </p>
      );
    }
  });

  return (
    <Controll lengs={pageNumbers.length}>
      <LeftI
        num={pageNumbers[0]}
        aria-hidden
        className="fa-solid fa-angle-left"
        onClick={handleLeftArrowList}
      ></LeftI>
      <div>{numbers}</div>
      <RightI
        num={pageNumbers.length}
        aria-hidden
        className="fa-solid fa-angle-right"
        onClick={handleRightArrowList}
      ></RightI>
    </Controll>
  );
}

const Controll = styled.div<{ lengs: number }>`
  width: ${({ lengs }) => {
    return `${lengs * 40 + 120}px `;
  }};
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
    }
    .active {
      color: #fff;
      background-color: #333;
    }
    .not-active {
      :hover {
        color: #fff;
        background-color: lightgray;
      }
    }

    .red {
      color: red;
    }
  }
`;

const LeftI = styled.i<{ num: number }>`
  :hover {
    ${({ num }) => {
      return num === 1
        ? undefined
        : "color:black; border:1px solid black; cursor: pointer";
    }};
  }
`;

const RightI = styled.i<{ num: number }>`
  :hover {
    ${({ num }) => {
      return num === 10
        ? "color:black; border:1px solid black; cursor:pointer"
        : undefined;
    }};
  }
`;
