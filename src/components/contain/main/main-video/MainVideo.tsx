import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MainVideo() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const videoList = arr.map((video) => {
    return (
      <div>
        <img src="/img/video-1.jpg"></img>
        <TextBox>
          <p>1</p>
          <p>{video}</p>
        </TextBox>
      </div>
    );
  });
  return (
    <Video>
      <h2>추천 영상</h2>
      <StyleSlider {...settings}>{videoList}</StyleSlider>
    </Video>
  );
}

const Video = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1260px;
  h2 {
    padding-left: 2.5px;
    margin-top: 40px;
  }
`;

const StyleSlider = styled(Slider)`
  .slick-list {
    padding: 0 -5px;
  }
  .slick-slide > div {
    margin: 20px 5px;
  }
  div {
    img {
      width: 100%;
      height: 170px;
    }
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 120px;
  background-color: #fff;
  padding: 20px;
`;

export default MainVideo;
