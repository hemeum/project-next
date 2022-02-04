import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

function Login() {
  const router = useRouter();
  const handleRegister = () => {
    router.push("/user/register");
  };
  return (
    <WrapLogin>
      <Logo>
        <Link href="/">
          <a>
            <img src="/img/logo-stv.png" />
          </a>
        </Link>
      </Logo>
      <LoginBox>
        <div>
          <SelectLogin>
            <div>아이디 로그인</div>
            <div>일회용 로그인</div>
          </SelectLogin>

          <Form>
            <div>
              <label></label>
              <input type="text" placeholder="아이디"></input>
            </div>

            <div>
              <label></label>
              <input type="password" placeholder="비밀번호"></input>
            </div>

            <button type="submit">로그인</button>
          </Form>
          <ButtonBox>
            <button type="button">아이디 찾기</button>
            &nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
            <button type="button"> 비밀번호 찾기</button>
            &nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
            <button type="button" onClick={handleRegister}>
              회원가입
            </button>
          </ButtonBox>
          <LineBox>
            <div></div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>또는</p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div></div>
          </LineBox>
          <RestLoginBox>
            <img src="/img/logo-naver.png"></img>
            <img src="/img/logo-kakao.png"></img>
            <img src="/img/logo-google.png"></img>
          </RestLoginBox>
        </div>
      </LoginBox>
    </WrapLogin>
  );
}

const WrapLogin = styled.div`
  text-align: center;
`;

const Logo = styled.h1`
  margin-top: 30px;
  img {
    width: 250px;
    height: 110px;
  }
`;

const LoginBox = styled.div`
  position: relative;
  > div {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SelectLogin = styled.div`
  display: flex;
  width: 400px;
  height: 40px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid lightgray;
  font-weight: bold;
  div {
    width: 200px;
    height: 40px;
    cursor: pointer;
    :nth-of-type(1) {
      position: absolute;
      top: 0;
      left: 0;
      color: #fd5001;
      border-bottom: 2px solid #fd5001;
      :hover {
        color: #fd5001;
      }
    }
    :nth-of-type(2) {
      position: absolute;
      top: 0;
      right: 0;
      color: #c0c0c0;
      border-bottom: 2px solid #c0c0c0;
      :hover {
        color: #fd5001;
      }
    }
  }
`;

const Form = styled.form`
  button {
    width: 400px;
    height: 55px;
    font-size: 17px;
    font-weight: bold;
    color: #fff;
    border-radius: 40px;
    background-color: #fd5001;
  }
  input {
    width: 400px;
    height: 55px;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 40px;
    background-color: #e8e8e8;
    border: none;
    :focus {
      outline: none;
    }

    ::placeholder {
      color: gray;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

const ButtonBox = styled.div`
  margin-top: 30px;
  button {
    cursor: pointer;
    :hover {
      border-bottom: 1px solid black;
    }
  }
  span {
    font-size: 13px;
    color: #ccc;
  }
`;

const LineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  div {
    width: 160px;
    height: 1px;
    background-color: #ccc;
  }
  p {
    font-size: 14px;
    color: #ccc;
  }
`;

const RestLoginBox = styled.div`
  margin-top: 50px;
  img:nth-of-type(2) {
    margin: 0 30px;
  }
  img:nth-of-type(3) {
    border: 1px solid lightgray;
    border-radius: 50%;
  }
`;

export default Login;
