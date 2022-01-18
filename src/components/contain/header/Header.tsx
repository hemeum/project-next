import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { debounce, throttle } from "lodash";

function Header() {
  const [gameBt, setGameBt] = useState(false);
  const [size, setSize] = useState(0);
  const [scroll, setScroll] = useState(0);

  const itemsRef1 = useRef<HTMLUListElement>(null);
  const itemsRef2 = useRef<HTMLUListElement>(null);
  const itemsRef3 = useRef<HTMLUListElement>(null);
  const itemsRef4 = useRef<HTMLUListElement>(null);
  const itemsRef5 = useRef<HTMLUListElement>(null);
  const itemsRef6 = useRef<HTMLUListElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleScroll = throttle(() => {
    console.log("scroll", scroll);
    setScroll(window.scrollY);
  }, 100);

  const handleResize = debounce(() => {
    console.log("resize", size);
    setSize(window.innerWidth);
  }, 300);

  useEffect(() => {
    // 빈배열에 size값 넣어도 되고, 안넣어도 됌. 넣지않으면 첫 실행되었을 때 값을 계속 유지함
    setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // throttle은 debounce와 달리 이벤트가 바로 실행되었다가 몇초 간격으로 다시 실행해주는 것이기 때문에, 빈배열에 scroll을 넣어주게 되면, 연속적으로 계속 실행하는 것과 같다. 따라서 비워주자.
    setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (headerRef.current !== null) {
    // css 우선순위에 의해서 styled-compo로 적용하는 스타일과 ref로 적용하는 스타일이 겹친다면 ref는 인라인 스타일로 class로 작성한 스타일보다 우선순위가 높다. 그러니 하나의 스타일을 바꿀 경우엔 통일한 방식으로 변경해주자.
    if (scroll > 0) {
      headerRef.current.style.backgroundColor = "black";
    } else if (scroll === 0) {
      headerRef.current.style.backgroundColor = "transparent";
    }
  }

  const itemRefArr = [
    itemsRef1,
    itemsRef2,
    itemsRef3,
    itemsRef4,
    itemsRef5,
    itemsRef6,
  ];

  const menuList = [
    {
      id: 1,
      menu: "새소식",
      items: [
        { id: 7, item: "공지사항" },
        { id: 8, item: "공지사항" },
        { id: 9, item: "공지사항" },
      ],
    },
    {
      id: 2,
      menu: "게임정보",
      items: [
        { id: 10, item: "공지사항" },
        { id: 11, item: "공지사항" },
        { id: 12, item: "공지사항" },
      ],
    },
    {
      id: 3,
      menu: "가이드",
      items: [
        { id: 13, item: "공지사항" },
        { id: 14, item: "공지사항" },
        { id: 15, item: "공지사항" },
      ],
    },
    {
      id: 4,
      menu: "커뮤니티",
      items: [
        { id: 16, item: "공지사항" },
        { id: 17, item: "공지사항" },
        { id: 18, item: "공지사항" },
      ],
    },
    {
      id: 5,
      menu: "미디어",
      items: [
        { id: 19, item: "공지사항" },
        { id: 20, item: "공지사항" },
        { id: 21, item: "공지사항" },
      ],
    },
    {
      id: 6,
      menu: "고객센터",
      items: [
        { id: 22, item: "공지사항" },
        { id: 23, item: "공지사항" },
        { id: 24, item: "공지사항" },
      ],
    },
  ];

  const menus = menuList.map((m, i) => {
    const item = m.items.map((v) => {
      return (
        <MenuListItem key={v.id}>
          <Link href="/">
            <a>{v.item}</a>
          </Link>
        </MenuListItem>
      );
    });

    return (
      <MenuList key={m.id}>
        <Link href="/">
          <a>{m.menu}</a>
        </Link>
        <MenuListItemBox ref={itemRefArr[i]}>{item}</MenuListItemBox>
      </MenuList>
    );
  });

  return (
    <>
      <HeaderC ref={headerRef} scroll={scroll}>
        <InnerL>
          <Logo size={size}>
            <h1>
              <a>
                {size < 1900 ? (
                  <img src="/img/logo-loa.png" alt="로스트아크 로고"></img>
                ) : (
                  <img src="/img/logo-loa2.png" alt="로스트아크 로고"></img>
                )}
              </a>
            </h1>
          </Logo>
          <Nav>
            <Menus
              onMouseEnter={() => {
                if (headerRef.current !== null) {
                  headerRef.current.style.backgroundColor = "black";
                  headerRef.current.style.height = "330px";
                  headerRef.current.style.transition = "height 0.2s ease-in";
                }

                if (itemsRef1.current !== null) {
                  itemsRef1.current.style.height = "250px";
                  itemsRef1.current.style.opacity = "1";
                  itemsRef1.current.style.visibility = "visible";
                  itemsRef1.current.style.transition = "opacity 0.5s ease";
                }
                if (itemsRef2.current !== null) {
                  itemsRef2.current.style.height = "250px";
                  itemsRef2.current.style.opacity = "1";
                  itemsRef2.current.style.visibility = "visible";
                  itemsRef2.current.style.transition = "opacity 0.5s ease";
                }
                if (itemsRef3.current !== null) {
                  itemsRef3.current.style.height = "250px";
                  itemsRef3.current.style.opacity = "1";
                  itemsRef3.current.style.visibility = "visible";
                  itemsRef3.current.style.transition = "opacity 0.5s ease";
                }
                if (itemsRef4.current !== null) {
                  itemsRef4.current.style.height = "250px";
                  itemsRef4.current.style.opacity = "1";
                  itemsRef4.current.style.visibility = "visible";
                  itemsRef4.current.style.transition = "opacity 0.5s ease";
                }
                if (itemsRef5.current !== null) {
                  itemsRef5.current.style.height = "250px";
                  itemsRef5.current.style.opacity = "1";
                  itemsRef5.current.style.visibility = "visible";
                  itemsRef5.current.style.transition = "opacity 0.5s ease";
                }
                if (itemsRef6.current !== null) {
                  itemsRef6.current.style.height = "250px";
                  itemsRef6.current.style.opacity = "1";
                  itemsRef6.current.style.visibility = "visible";
                  itemsRef6.current.style.transition = "opacity 0.5s ease";
                }
              }}
              onMouseLeave={() => {
                if (headerRef.current !== null) {
                  if (scroll === 0) {
                    headerRef.current.style.backgroundColor = "transparent";
                  } else {
                    headerRef.current.style.backgroundColor = "black";
                  }

                  headerRef.current.style.height = "80px";
                  headerRef.current.style.transition =
                    "height 0.2s ease-in, background-color 0.2s ease-in";
                }
                if (itemsRef1.current !== null) {
                  itemsRef1.current.style.height = "0px";
                  itemsRef1.current.style.opacity = "0";
                  itemsRef1.current.style.visibility = "hidden";
                }
                if (itemsRef2.current !== null) {
                  itemsRef2.current.style.height = "0px";
                  itemsRef2.current.style.opacity = "0";
                  itemsRef2.current.style.visibility = "hidden";
                }
                if (itemsRef3.current !== null) {
                  itemsRef3.current.style.height = "0px";
                  itemsRef3.current.style.opacity = "0";
                  itemsRef3.current.style.visibility = "hidden";
                }
                if (itemsRef4.current !== null) {
                  itemsRef4.current.style.height = "0px";
                  itemsRef4.current.style.opacity = "0";
                  itemsRef4.current.style.visibility = "hidden";
                }
                if (itemsRef5.current !== null) {
                  itemsRef5.current.style.height = "0px";
                  itemsRef5.current.style.opacity = "0";
                  itemsRef5.current.style.visibility = "hidden";
                }
                if (itemsRef6.current !== null) {
                  itemsRef6.current.style.height = "0px";
                  itemsRef6.current.style.opacity = "0";
                  itemsRef6.current.style.visibility = "hidden";
                }
              }}
            >
              {menus}
            </Menus>
          </Nav>
        </InnerL>
        <InnerR>
          <button type="button">LOGIN</button>
          {gameBt ? (
            <img
              src="/img/header-gamestart-bt-hover.png"
              alt="게임 시작 버튼"
              onMouseLeave={() => {
                setGameBt(!gameBt);
              }}
            ></img>
          ) : (
            <img
              src="/img/header-gamestart-bt.png"
              alt="게임 시작 버튼"
              onMouseEnter={() => {
                setGameBt(!gameBt);
              }}
            ></img>
          )}
        </InnerR>
        <HeaderBottomLine></HeaderBottomLine>
      </HeaderC>
    </>
  );
}

const HeaderC = styled.header<{ ref: any; scroll: number }>`
  position: ${({ scroll }) => {
    return scroll > 0 ? "fixed" : "absolute";
  }};
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  z-index: 9999;
  transition: background-color 100ms ease-in-out;
  ${({ scroll }) => {
    return scroll > 0
      ? "background-color:black"
      : "background-color:transparent";
  }};
`;

const HeaderBottomLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: transparent;
  border-bottom: 1px solid rgba(211, 211, 211, 0.2);
  pointer-events: none;
`;

const InnerL = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
`;

const Logo = styled.div<{ size: number }>`
  height: 80px;
  a {
    display: block;
    height: 50px;
    img {
      ${({ size }) => {
        return size < 1900
          ? "width:50px; margin-left:30px;"
          : "width:160px; margin-left: 80px; margin-right: 30px";
      }};
      transition: all 0s;
      height: 50px;
      margin-top: 15px;
    }
  }
`;

const Nav = styled.nav`
  width: 50%;
`;

const Menus = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
`;

const MenuList = styled.li`
  width: 16.667%;
  height: 80px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 50px;
  > a {
    display: inline-block;
    height: 80px;
    font-weight: bold;
    line-height: 80px;
  }
  :hover {
    > a {
      border-bottom: 3px solid #fff;
    }
  }
`;

const MenuListItemBox = styled.ul<{ ref: any }>`
  width: 100%;
  height: 0px;
  padding-top: 15px;
  opacity: 0;
  visibility: hidden;
`;

const MenuListItem = styled.li`
  height: 40px;
  font-size: 13px;
  color: gray;
  a:hover {
    color: #fff;
    border-bottom: 1px solid #fff;
  }
`;

const InnerR = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  button {
    font-size: 16px;
    color: #fff;
    margin-right: 20px;
    border: 0;
    outline: 0;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default Header;
