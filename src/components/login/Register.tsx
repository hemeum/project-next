import styled from "styled-components";
import useInput from "src/hooks/useInput";
import axios from "axios";
import Link from "next/link";

function Register() {
  const username = useInput(); // useInput()이 return하는 객체를 username에 담음.
  const pwd = useInput();
  const checkPwd = useInput();
  const nickname = useInput();

  const handleResiter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(1);
    axios
      .post("/auth/register", {
        username: username,
        pwd: pwd,
        nickname: nickname,
      })
      .then((res) => {
        console.log(res.data);
      });
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
      <Form onSubmit={handleResiter}>
        <div>
          <label htmlFor="username">아이디</label>
          <br />
          <input
            type="text"
            onChange={username.handleInputValue}
            value={username.inputValue}
            name="username"
          ></input>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <br />
          <input
            type="password"
            onChange={pwd.handleInputValue}
            value={pwd.inputValue}
            name="password"
          ></input>
        </div>
        <div>
          <label htmlFor="check_password">비밀번호 확인</label>
          <br />
          <input
            type="password"
            onChange={checkPwd.handleInputValue}
            value={checkPwd.inputValue}
            name="check_password"
          ></input>
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <br />
          <input
            type="text"
            onChange={nickname.handleInputValue}
            value={nickname.inputValue}
            name="nickname"
          ></input>
        </div>

        <InputBt type="submit" value="회원가입"></InputBt>
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
    margin: 0 auto;
    label {
      font-weight: bold;
    }
    input {
      width: 100%;
      height: 50px;
      margin: 10px 0 20px;
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

export default Register;
