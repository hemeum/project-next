import styled from "styled-components";

const MainSearch = () => {
  return (
    <SearchBox>
      <SearchInput>
        <h3>전투 정보실</h3>
        <input type="text" placeholder="캐릭터명을 입력해주세요"></input>
        <i className="fas fa-search"></i>
      </SearchInput>
      <SearchInput>
        <h3>게임 가이드</h3>
        <input type="text" placeholder="검색어를 입력해주세요"></input>
        <i className="fas fa-search"></i>
      </SearchInput>
    </SearchBox>
  );
};

const SearchBox = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-evenly;
  width: 1260px;
  height: 80px;
  background-color: #2b2f3a;
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  input {
    width: 400px;
    height: 50px;
    margin-left: 20px;
    padding-left: 10px;
    color: #fff;
    font-size: 16px;
    background-color: #222;
    border: none;
    ::placeholder {
      font-weight: bold;
    }
    :focus {
      outline: none;
    }
  }
  .fa-search {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 20px;
    cursor: pointer;
  }
`;

export default MainSearch;
