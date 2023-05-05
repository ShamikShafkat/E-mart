import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductImages = (props) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "0px",
  };
  return (
    <Slider {...settings}>
      {props.imagesList? props.imagesList.map(value=>{
        return(
          <div>
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                maxHeight: "100%",
                maxWidth: "100%",
                height: 500,
                width: 500,
              }}
              src={value}
              alt="Product Image"
            />
          </div>
        )
      }):<></>}
      
    </Slider>
  );
};

export default ProductImages;
