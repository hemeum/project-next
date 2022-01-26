import styled from "styled-components";

function Footer() {
  const texts = [
    { id: 1, text: "회사소개" },
    { id: 2, text: "이용약관" },
    { id: 3, text: "개인정보처리방침" },
    { id: 4, text: "운영정책" },
    { id: 5, text: "이벤트&UGC규약" },
    { id: 6, text: "청소년보호정책" },
    { id: 7, text: "게임이용등급" },
    { id: 8, text: "고객센터" },
    { id: 9, text: "제휴문의" },
  ];

  const textList = texts.map((text) => {
    return <span key={text.id}>{text.text}</span>;
  });

  return (
    <Foot>
      <div>
        <Imgs>
          <img src="/img/logo_rpg.png"></img>
          <img src="/img/logo_stove.png"></img>
        </Imgs>
        <Text>
          <div>{textList}</div>
          <address>
            회사명.(주)스마일게이트 알피지&nbsp;&nbsp;&nbsp;
            대표이사.지원길&nbsp;&nbsp;&nbsp; 사업자등록번호. 220-88.29249
            <br />
            통신판매업 신고번호. 제2017-성남분당-0904호&nbsp;&nbsp;&nbsp;
            E.lostark@smilegate.com&nbsp;&nbsp;&nbsp; F.031-627-0400
          </address>
          <p>Ⓒ smilegate RPG & Smilegate Stove All rights reserved.</p>
        </Text>
      </div>
    </Foot>
  );
}

const Foot = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  background-color: #666;
  > div {
    margin-top: 50px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    width: 1260px;
  }
`;

const Imgs = styled.div`
  img {
    margin-right: 30px;
    :last-child {
      margin-right: 0;
    }
  }
`;

const Text = styled.div`
  padding-top: 5px;
  span {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #fff;
    color: #fff;
    font-size: 14px;
    :nth-of-type(3) {
      color: pink;
    }
    :last-child {
      border: none;
    }
  }
  address {
    margin-top: 10px;
    font-size: 12px;
    font-style: normal;
    color: gray;
  }
  p {
    margin-top: 10px;
    color: #fff;
    font-size: 14px;
  }
`;

export default Footer;
