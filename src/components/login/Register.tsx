import styled from "styled-components";
import useInput from "src/hooks/useInput";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();

  const username = useInput(); // useInput()이 return하는 객체를 username에 담음.
  const pwd = useInput();
  const checkPwd = useInput();
  const nickname = useInput();

  const [checkValue, setCheckValue] = useState([true, true, true, true]);
  // 아무것도 입력하지 않고 input에서 마우스를 떼면 필수정보 flash 띄우기

  const [samePwd, setSamePwd] = useState(true);
  // 비밀번호 똑같이 썼다면 true, 아니라면 false

  const [checkRgx, setCheckRgx] = useState([true, true, true, true]);
  // 각 input마다 rgx를 통과하는지 통과한 input은 true 유지. 통과못하면 false

  const [repeatCheck, setRepeactCheck] = useState(true);

  const handleResiter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post("/apit/auth/register", {
        username: username.inputValue,
        pwd: pwd.inputValue,
        nickname: nickname.inputValue,
      })
      .then(() => {
        router.push("/");
      });
  };

  const handleBlur = (e: any) => {
    let arr = e.currentTarget.parentNode.parentNode.childNodes;
    let index = [...arr].indexOf(e.currentTarget.parentNode);
    if (e.currentTarget.value.length === 0) {
      let newCheckValue = [...checkValue];
      newCheckValue.splice(index, 1, false);
      setCheckValue(newCheckValue);
    } else {
      let newCheckValue = [...checkValue];
      newCheckValue.splice(index, 1, true);
      setCheckValue(newCheckValue);
    }
    if (index === 0) {
      // 5~20자의 영문 대소문자, 숫자로만 구성된 username 정규표현식
      let rgx = /^[a-zA-Z0-9]{5,20}$/gm;
      if (username.inputValue.length === 0 || rgx.test(e.currentTarget.value)) {
        let newCheckRgx = [...checkRgx];
        newCheckRgx.splice(index, 1, true);
        setCheckRgx(newCheckRgx);
        // 중복된 아이디인지 체크
        axios
          .post("/api/auth/repeatCheck", { username: username.inputValue })
          .then((res) => {
            setRepeactCheck(res.data);
          });
      } else {
        let newCheckRgx = [...checkRgx];
        newCheckRgx.splice(index, 1, false);
        setCheckRgx(newCheckRgx);
      }
    }
    if (index === 1) {
      // 8~16자리 영문 대소문자, 숫자, 특수기호로 구성된 pwd 정규표현식
      let rgx = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/gm;
      if (pwd.inputValue.length === 0 || rgx.test(e.currentTarget.value)) {
        let newCheckRgx = [...checkRgx];
        newCheckRgx.splice(index, 1, true);
        setCheckRgx(newCheckRgx);
      } else {
        let newCheckRgx = [...checkRgx];
        newCheckRgx.splice(index, 1, false);
        setCheckRgx(newCheckRgx);
      }
      if (pwd.inputValue.length !== 0 && checkPwd.inputValue.length !== 0) {
        // 비밀번호 똑같이 썼는지 확인
        if (pwd.inputValue !== checkPwd.inputValue) {
          setSamePwd(false);
        } else {
          setSamePwd(true);
        }
      }
    }
    if (index === 2) {
      if (pwd.inputValue.length !== 0 && checkPwd.inputValue.length !== 0) {
        // 비밀번호 똑같이 썼는지 확인
        if (pwd.inputValue !== checkPwd.inputValue) {
          setSamePwd(false);
        } else {
          setSamePwd(true);
        }
      }
    }
    if (index === 3) {
      let rgx = /^[가-힣a-zA-Z0-9]{5,20}$/gm;
      if (nickname.inputValue.length === 0 || rgx.test(e.currentTarget.value)) {
        let newCheckRgx = [...checkRgx];
        newCheckRgx.splice(index, 1, true);
        setCheckRgx(newCheckRgx);
      } else {
        let newCheckRgx = [...checkRgx];
        newCheckRgx.splice(index, 1, false);
        setCheckRgx(newCheckRgx);
      }
    }
  };

  const checkAllInputs = () => {
    if (
      // 유효성검사를 전부 통과했다면 true를 리턴하는 함수
      // true라면 type button에서 type submit input으로
      username.inputValue.length !== 0 &&
      pwd.inputValue.length !== 0 &&
      checkPwd.inputValue.length !== 0 &&
      nickname.inputValue.length !== 0
    ) {
      const dontCheck = checkRgx.filter((data) => {
        return data === false;
      });
      if (dontCheck.length === 0) {
        return true;
      }
    }
  };

  return (
    <RegisterBox>
      <Logo>
        <Link href="/">
          <a>
            <img src="/img/logo-stv.png" />
          </a>
        </Link>
      </Logo>
      <Form onSubmit={handleResiter} method="post">
        <div>
          <label htmlFor="username">아이디</label>
          <br />
          <input
            type="text"
            onChange={username.handleInputValue}
            value={username.inputValue}
            name="username"
            onBlur={handleBlur}
          ></input>
          {checkValue[0] ? undefined : (
            <FlashMassage>필수 정보입니다.</FlashMassage>
          )}
          {username.inputValue.length === 0 || checkRgx[0] ? undefined : (
            <FlashMassage>
              5~20자의 영문 대소문자, 숫자만 사용가능합니다.
            </FlashMassage>
          )}
          {repeatCheck ? undefined : (
            <FlashMassage>이미 사용중인 아이디입니다.</FlashMassage>
          )}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <br />
          <input
            type="password"
            onChange={pwd.handleInputValue}
            value={pwd.inputValue}
            name="password"
            onBlur={handleBlur}
          ></input>
          {checkValue[1] ? undefined : (
            <FlashMassage>필수 정보입니다.</FlashMassage>
          )}
          {pwd.inputValue.length === 0 || checkRgx[1] ? undefined : (
            <FlashMassage>
              8~16자의 영문 대소문자, 숫자, 특수기호만 사용가능합니다.
            </FlashMassage>
          )}
        </div>
        <div>
          <label htmlFor="check_password">비밀번호 확인</label>
          <br />
          <input
            type="password"
            onChange={checkPwd.handleInputValue}
            value={checkPwd.inputValue}
            name="check_password"
            onBlur={handleBlur}
          ></input>
          {checkValue[2] ? (
            samePwd ? undefined : (
              <FlashMassage>비밀번호가 일치하지 않습니다.</FlashMassage>
            )
          ) : (
            <FlashMassage>필수 정보입니다.</FlashMassage>
          )}
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <br />
          <input
            type="text"
            onChange={nickname.handleInputValue}
            value={nickname.inputValue}
            name="nickname"
            onBlur={handleBlur}
          ></input>
          {checkValue[3] ? undefined : (
            <FlashMassage>필수 정보입니다.</FlashMassage>
          )}
          {nickname.inputValue.length === 0 || checkRgx[3] ? undefined : (
            <FlashMassage>
              5~20자의 한글, 영문 대소문자, 숫자만 가능합니다.
            </FlashMassage>
          )}
        </div>

        {repeatCheck && checkAllInputs() ? (
          <InputBt type="submit" value="회원가입"></InputBt>
        ) : (
          <CheckBt
            type="button"
            onClick={() => {
              window.alert("다시 입력해주세요.");
            }}
          >
            회원가입
          </CheckBt>
        )}
      </Form>
    </RegisterBox>
  );
}

const RegisterBox = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const Logo = styled.h1`
  margin-top: 30px;
  img {
    width: 250px;
    height: 110px;
  }
`;

const Form = styled.form`
  width: 100%;
  div {
    width: 400px;
    text-align: left;
    margin: 0 auto 20px;
    label {
      font-weight: bold;
    }
    input {
      width: 100%;
      height: 50px;
      margin: 10px 0 0 0;
      font-size: 16px;
      padding-left: 10px;
    }
  }
`;

const InputBt = styled.input`
  width: 400px;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #fff;
  background-color: #fd5001;
  border: none;
  outline: none;
  cursor: pointer;
`;

const CheckBt = styled.button`
  width: 400px;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #fff;
  background-color: #fd5001;
  border: none;
  outline: none;
  cursor: pointer;
`;

const FlashMassage = styled.p`
  color: red;
  font-size: 14px;
`;

export default Register;
