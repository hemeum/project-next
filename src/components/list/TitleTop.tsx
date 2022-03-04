import styled from "styled-components";
import { useRouter } from "next/router";
export default function TitleTop() {
  const router = useRouter();
  // router.query 넣어서 바꿔주자
  return (
    <Top>
      <h2>{router.query.ctg}</h2>
      <GoBack>
        <i aria-hidden className="fa fa-align-justify"></i>
        <p>목록가기</p>
      </GoBack>
    </Top>
  );
}

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 3px solid black;
`;

const GoBack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  padding: 5px 15px;
  border: 1px solid lightgray;
  font-weight: bold;
  cursor: pointer;
  i {
    margin-right: 5px;
  }
`;
