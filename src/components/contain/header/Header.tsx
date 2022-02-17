import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { throttle } from "lodash";

function Header() {
  const [gameBt, setGameBt] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const itemsRef1 = useRef<HTMLUListElement>(null);
  const itemsRef2 = useRef<HTMLUListElement>(null);
  const itemsRef3 = useRef<HTMLUListElement>(null);
  const itemsRef4 = useRef<HTMLUListElement>(null);
  const itemsRef5 = useRef<HTMLUListElement>(null);
  const itemsRef6 = useRef<HTMLUListElement>(null);

  const menuRef1 = useRef<HTMLLIElement>(null);
  const menuRef2 = useRef<HTMLLIElement>(null);
  const menuRef3 = useRef<HTMLLIElement>(null);
  const menuRef4 = useRef<HTMLLIElement>(null);
  const menuRef5 = useRef<HTMLLIElement>(null);
  const menuRef6 = useRef<HTMLLIElement>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const pracRef = useRef<HTMLDivElement>(null);

  const itemRefArr = [
    itemsRef1,
    itemsRef2,
    itemsRef3,
    itemsRef4,
    itemsRef5,
    itemsRef6,
  ];

  const menuRefArr: any[] = [
    menuRef1,
    menuRef2,
    menuRef3,
    menuRef4,
    menuRef5,
    menuRef6,
  ];

  /* redux 관련 */
  const { isLogin, nickname } = useSelector((state: any) => {
    return state.authReducer;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "LOGIN_KEEP_REQUEST" });
  }, []);

  /* 로그아웃 redux */
  const handleLogout = () => {
    const logout = confirm("로그아웃 하시겠습니까?");
    if (logout) {
      dispatch({ type: "LOGOUT_REQUEST" });
    } else {
      return;
    }
  };

  /* window resize 관련 */
  const [size, setSize] = useState(0);

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

  /* scroll 관련 */
  const [scroll, setScroll] = useState(0);
  const handleScroll = throttle(() => {
    if (window.scrollY < 100) {
      setScroll(window.scrollY);
    }
  }, 200);

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
      headerRef.current.style.transition = "background-color 0.2s ease";
    } else if (scroll === 0 && isHover !== true) {
      // 이 부분이 문제군
      headerRef.current.style.backgroundColor = "transparent";
      headerRef.current.style.transition = "background-color 0.2s ease";
      if (pracRef.current !== null) {
        pracRef.current.style.height = "0px";
        pracRef.current.style.opacity = "0";
        pracRef.current.style.visibility = "hidden";
        pracRef.current.style.transition =
          "height 0.2s ease, opacity 0.2s ease, visibility 0.2s ease";
      }
    }
  }
  /* 마우스 hover and leave 관련 */

  const handleHover = () => {
    if (pracRef.current !== null) {
      pracRef.current.style.height = "250px";
      pracRef.current.style.opacity = "1";
      pracRef.current.style.visibility = "visible";
      pracRef.current.style.transition =
        "height 0.2s ease, opacity 0.2s ease, visibility 0.2s ease";
    }

    if (headerRef.current !== null) {
      headerRef.current.style.backgroundColor = "black";
      headerRef.current.style.transition = "background-color 0.2s ease";
    }
    setIsHover(true);
  };

  const handleLeave = () => {
    if (pracRef.current !== null) {
      pracRef.current.style.height = "0px";
      pracRef.current.style.opacity = "0";
      pracRef.current.style.visibility = "hidden";
      pracRef.current.style.transition =
        "height 0.2s ease, opacity 0.2s ease, visibility 0.2s ease";
    }
    if (headerRef.current !== null) {
      if (scroll === 0) {
        headerRef.current.style.backgroundColor = "transparent";
      } else {
        headerRef.current.style.backgroundColor = "black";
      }
      headerRef.current.style.transition = "background-color 0.2s ease";
    }
    setIsHover(false);
  };

  const handleHoverBorder = (e: { currentTarget: { parentNode: any } }) => {
    const parent = e.currentTarget.parentNode.childNodes;
    const index = [...parent].indexOf(e.currentTarget);
    menuRefArr[index].current.style.borderBottom = "3px solid #fff";
  };

  const handleLeaveBorder = (e: { currentTarget: { parentNode: any } }) => {
    const parent = e.currentTarget.parentNode.childNodes;
    const index = [...parent].indexOf(e.currentTarget);
    menuRefArr[index].current.style.borderBottom = "none";
  };

  const menuList = [
    {
      id: 1,
      menu: "새소식",
      items: [
        { id: 7, item: "공지사항", url: "/" },
        { id: 8, item: "공지사항", url: "/" },
        { id: 9, item: "공지사항", url: "/" },
      ],
      url: "/",
    },
    {
      id: 2,
      menu: "게임정보",
      items: [
        { id: 10, item: "공지사항", url: "/" },
        { id: 11, item: "공지사항", url: "/" },
        { id: 12, item: "공지사항", url: "/" },
      ],
      url: "/",
    },
    {
      id: 3,
      menu: "가이드",
      items: [
        { id: 13, item: "공지사항", url: "/" },
        { id: 14, item: "공지사항", url: "/" },
        { id: 15, item: "공지사항", url: "/" },
      ],
      url: "/",
    },
    {
      id: 4,
      menu: "커뮤니티",
      items: [
        {
          id: 16,
          item: "자유게시판",
          url: {
            pathname: "/community/freelist",
            query: { ctg: "자유게시판" },
          },
        },
        { id: 17, item: "공지사항", url: "/" },
        { id: 18, item: "공지사항", url: "/" },
      ],
      url: "/community/freelist",
    },
    {
      id: 5,
      menu: "미디어",
      items: [
        { id: 19, item: "공지사항", url: "/" },
        { id: 20, item: "공지사항", url: "/" },
        { id: 21, item: "공지사항", url: "/" },
      ],
      url: "/",
    },
    {
      id: 6,
      menu: "고객센터",
      items: [
        { id: 22, item: "공지사항", url: "/" },
        { id: 23, item: "공지사항", url: "/" },
        { id: 24, item: "공지사항", url: "/" },
      ],
      url: "/",
    },
  ];

  const handleHeaderBg = () => {
    if (headerRef.current !== null) {
      headerRef.current.style.backgroundColor = "black";
    }
  };

  const menus = menuList.map((m, i) => {
    return (
      <MenuList
        key={m.id}
        onMouseEnter={(e) => {
          handleHoverBorder(e);
          handleHover();
        }}
        onMouseLeave={handleLeaveBorder}
        onClick={handleHeaderBg}
      >
        <Link href={m.url}>
          <a onClick={handleHeaderBg} ref={menuRefArr[i]}>
            {m.menu}
          </a>
        </Link>
      </MenuList>
    );
  });

  const menuListItems = menuList.map((menu, i) => {
    const items = menu.items.map((item) => {
      return (
        <MenuListItem key={item.id} onClick={handleHeaderBg}>
          <Link href={item.url}>
            <a onClick={handleHeaderBg}>{item.item}</a>
          </Link>
        </MenuListItem>
      );
    });
    return (
      <MenuItemBox
        key={menu.id}
        ref={itemRefArr[i]}
        onMouseEnter={handleHoverBorder}
        onMouseLeave={handleLeaveBorder}
      >
        {items}
      </MenuItemBox>
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
            <Menus onMouseEnter={handleHover} onMouseLeave={handleLeave}>
              {menus}
            </Menus>
          </Nav>
          <Prac ref={pracRef} size={size}>
            <ul onMouseEnter={handleHover} onMouseLeave={handleLeave}>
              {menuListItems}
            </ul>
          </Prac>
        </InnerL>
        <InnerR>
          {!isLogin ? (
            <Link href="/user/login">
              <a
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "red";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#fff";
                }}
              >
                LOGIN
              </a>
            </Link>
          ) : (
            <Link href="/">
              <a
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "red";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#fff";
                }}
                onClick={handleLogout}
              >
                {nickname}
              </a>
            </Link>
          )}

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

const Prac = styled.div<{ ref: any; size: number }>`
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 0px;
  background-color: black;
  opacity: 0;
  visibility: hidden;
  ul {
    width: 50%;
    height: 100%;
    margin-left: ${({ size }) => {
      return size < 1900 ? "80px" : "270px";
    }};
    color: #fff;
    display: flex;
    justify-content: space-around;
  }
`;

const HeaderC = styled.header<{ ref: any; scroll: number }>`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  z-index: 9999;
  transition: backgorund-color 0.2 ease;
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

const MenuItemBox = styled.li<{ ref: any }>`
  width: 16.667%;
  text-align: center;
  padding-top: 20px;
`;

const MenuListItem = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 14px;
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
  a {
    font-size: 16px;
    color: #fff;
    margin-right: 20px;
  }
`;

export default Header;
