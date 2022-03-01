import Link from "next/link";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

function Gnb() {
  const nickname = useSelector((state: any) => {
    return state.authReducer.nickname;
  });

  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    axios.get("/hi/abc").then((res) => {
      console.log(res.data.hi);
    });
  }, [toggle]);

  return (
    <Wrap>
      <Inner>
        <Logo>
          <h1 className="gnb-title"></h1>
          <Link href="/">
            <a>
              <img src="/img/logo-stv.png" alt="stove 로고"></img>
            </a>
          </Link>
        </Logo>
        <ul>
          <li
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            PC게임
          </li>
          <li>모바일게임</li>
          <li>인디게임</li>
        </ul>
      </Inner>
      <Service>
        <i aria-hidden className="fas fa-bars"></i>
        <p>{nickname.length !== 0 ? nickname : "로그인"}</p>
      </Service>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  min-width: 1300px;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const Inner = styled.div`
  display: flex;
  height: 70px;
  ul {
    display: flex;
    line-height: 70px;
    li {
      font-weight: bold;
      margin-right: 40px;
    }
  }
`;

const Logo = styled.div`
  margin-right: 50px;
  a {
    display: block;
    height: 100%;
    img {
      width: 120px;
      height: 50px;
      margin-top: 10px;
      object-fit: cover;
    }
  }
`;

const Service = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 30px;
  line-height: 70px;
  i {
    font-size: 20px;
    line-height: 70px;
    margin-right: 20px;
  }
  p {
    font-weight: bold;
  }
`;

export default Gnb;
