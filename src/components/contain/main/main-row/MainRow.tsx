import styled from "styled-components";
import Link from "next/link";

function MainRow() {
  return (
    <Row>
      <RowList>
        <div>
          <h2>업데이트</h2>
          <Link href="/">
            <a>
              <img src="/img/update-1.jpg"></img>
            </a>
          </Link>
          <Link href="/">
            <a>
              <i className="fas fa-plus"></i>
            </a>
          </Link>
        </div>
        <div>
          <h2>핵심 가이드</h2>
          <Link href="/">
            <a>
              <img src="/img/guide-1.jpg"></img>
            </a>
          </Link>
          <Link href="/">
            <a>
              <i className="fas fa-plus"></i>
            </a>
          </Link>
        </div>
        <div>
          <h2>리샤의 편지</h2>
          <Link href="/">
            <a>
              <img src="/img/event-1.jpg"></img>
            </a>
          </Link>
          <Link href="/">
            <a>
              <img src="/img/benefit-1.jpg"></img>
            </a>
          </Link>
          <Link href="/">
            <a>
              <i className="fas fa-plus"></i>
            </a>
          </Link>
        </div>
      </RowList>
      <QuickBox>
        <li>
          <Link href="/">
            <a>
              <div>
                <i className="fas fa-chart-line"></i>
              </div>
              <div>
                <p>구매해야 할 아이템이 있다면?</p>
                <h4>거래소</h4>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <div>
                <i className="fas fa-balance-scale"></i>
              </div>
              <div>
                <p>더 다양한 물품들을 만나보세요!</p>
                <h4>경매장</h4>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <div>
                <i className="fas fa-store"></i>
              </div>
              <div>
                <p>'성장'과 '전투/생활' 추천 상품 입고!</p>
                <h4>마리의 비밀 상점 시즌3</h4>
              </div>
            </a>
          </Link>
        </li>
      </QuickBox>
    </Row>
  );
}

const Row = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 1260px;
  height: 450px;
`;

const RowList = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    position: relative;
    top: 0;
    left: 0;
    h2 {
      color: black;
      margin-bottom: 20px;
    }
    i {
      position: absolute;
      top: 7px;
      right: 0;
      font-size: 20px;
      color: lightgray;
      cursor: pointer;
      :hover {
        color: black;
      }
    }
    :last-child {
      width: 350px;
      img {
        margin-bottom: 4px;
      }
    }
  }
`;

const QuickBox = styled.ul`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 80px;

  li {
    a {
      display: flex;
    }
    div:first-child {
      padding: 12px;
      background-color: #c0c0c0;
      border-radius: 50%;
      margin-right: 15px;
      i {
        font-size: 35px;
        color: #fff;
      }
    }
    div:last-child {
      p {
        margin: 3.5px 0;
        color: gray;
      }
    }
  }
`;

export default MainRow;
