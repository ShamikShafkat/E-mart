import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <Slider {...settings}>
      <div>
        <img
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
            height: 475,
            width: 1000,
          }}
          src="images/advertisement.png"
          alt="Advertisement"
        />
      </div>
      <div>
        <img
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
            height: 475,
            width: 1000,
          }}
          src="images/main-banner.jpg"
          alt="Advertisement"
        />
      </div>
      <div>
        <img
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
            height: 475,
            width: 1000,
          }}
          src="images/banglalink.png"
          alt="Architecture"
        />
      </div>
    </Slider>
  );
};

export default ImageSlider;
