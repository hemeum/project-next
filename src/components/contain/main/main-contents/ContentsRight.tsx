import styled from "styled-components";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function PrevArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={className}
      style={{
        ...style,
        zIndex: "100",
        transform: "translate(80px, 20px)",
      }}
      onClick={onClick}
    />
  );
}

function NextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={className}
      style={{
        ...style,
        zIndex: "100",
        transform: "translate(-80px, 20px)",
      }}
      onClick={onClick}
    />
  );
}

function ContentsRight() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const conRightImgs = [
    { id: 10, src: "/img/bg_class_striker.jpg" },
    { id: 11, src: "/img/bg_class_gunslinger.jpg" },
    { id: 12, src: "/img/bg_class_sorceress.jpg" },
  ];

  const rightImgs = conRightImgs.map((img) => {
    return (
      <div key={img.id}>
        <img src={img.src} alt="컨텐츠 이미지"></img>
        <ClassBox>
          <Link href="/">
            <a>
              <div>
                <p>클래스 소개</p>
                <i className="fas fa-chevron-right"></i>
              </div>
            </a>
          </Link>
          <Link href="/">
            <a>
              <div>
                <p>영상 소개</p>
                <i className="fas fa-chevron-right"></i>
              </div>
            </a>
          </Link>
        </ClassBox>
      </div>
    );
  });
  return (
    <Contents>
      <StyleSlider {...settings}>{rightImgs}</StyleSlider>
      <Link href="/">
        <a>
          <ClassInfo>
            <p>클래스 더보기</p>
            <i className="fas fa-plus"></i>
          </ClassInfo>
        </a>
      </Link>
    </Contents>
  );
}

const Contents = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-image: url("/img/bg_class_striker.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;

const StyleSlider = styled(Slider)`
  .slick-dots {
    transform: translateY(-100px);
    z-index: 500;
    .slick-active {
      button::before {
        color: #fff;
      }
    }
    button::before {
      font-size: 15px;
      color: lightgray;
    }
  }
`;

const ClassBox = styled.div`
  transform: translate(65px, -180px);
  display: flex;
  color: #fff;
  z-index: 500;
  width: 310px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    margin-right: 10px;
    padding: 10px;
    border: 0.2px solid gray;
    background-color: transparent;
    i {
      margin-left: 10px;
      color: lightgray;
    }
    :hover {
      color: black;
      background-color: #fff;
      i {
        color: black;
      }
    }
  }
`;

const ClassInfo = styled.div`
  position: absolute;
  bottom: 100px;
  left: 160px;
  z-index: 500;
  color: #4aa8d8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  i {
    margin-left: 5px;
    font-size: 10px;
  }
`;

export default ContentsRight;
