import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import axios from "axios";

function Header({ scroll }: { scroll: number }) {
  const router = useRouter();

  const [nickname, setNickname] = useState<any>("");
  const [isLogin, setIsLogin] = useState(false);
  const [gameBt, setGameBt] = useState(false);
  const [size, setSize] = useState(0);

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

  useEffect(() => {
    // 빈배열에 size값 넣어도 되고, 안넣어도 됌. 넣지않으면 첫 실행되었을 때 값을 계속 유지함
    setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // 로그인한 후 로그인한 nickname 보여주기
    if (router.query.nickname !== null) {
      setNickname(router.query.nickname);
    }
  }, []);

  useEffect(() => {
    // 이 부분은 ssr로 해보자. get~~
    axios.get("/auth/keep_login", { withCredentials: true }).then((res) => {
      setNickname(res.data.nickname);
      setIsLogin(res.data.isLogin);
    });
  }, []);

  const handleResize = debounce(() => {
    console.log("resize", size);
    setSize(window.innerWidth);
  }, 300);

  const handleHover = () => {
    if (pracRef.current !== null) {
      pracRef.current.style.height = "250px";
      pracRef.current.style.opacity = "1";
      pracRef.current.style.visibility = "visible";
      pracRef.current.style.transition =
        "height 0.5s ease, opacity 0.2s ease, visibility 0.2s ease";
    }

    if (headerRef.current !== null) {
      headerRef.current.style.backgroundColor = "black";
      headerRef.current.style.transition = "background-color 0.2s ease";
    }
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
      headerRef.current.style.transition = "background-color 0.3s ease";
    }
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

  if (headerRef.current !== null) {
    // css 우선순위에 의해서 styled-compo로 적용하는 스타일과 ref로 적용하는 스타일이 겹친다면 ref는 인라인 스타일로 class로 작성한 스타일보다 우선순위가 높다. 그러니 하나의 스타일을 바꿀 경우엔 통일한 방식으로 변경해주자.
    if (scroll > 0) {
      headerRef.current.style.backgroundColor = "black";
    } else if (scroll === 0) {
      headerRef.current.style.backgroundColor = "transparent";
    }
  }

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
    return (
      <MenuList
        key={m.id}
        onMouseEnter={handleHoverBorder}
        onMouseLeave={handleLeaveBorder}
      >
        <Link href="/">
          <a ref={menuRefArr[i]}>{m.menu}</a>
        </Link>
      </MenuList>
    );
  });

  const menuListItems = menuList.map((menu, i) => {
    const items = menu.items.map((item) => {
      return (
        <MenuListItem key={item.id}>
          <Link href="/">
            <a>{item.item}</a>
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
