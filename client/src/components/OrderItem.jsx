import React from "react";
import { useNavigate } from "react-router-dom";

const OrderItem = (props) => {

  const navigate = useNavigate()

  const goToReview = (event)=>{
    navigate(`/Review/${props.orderItem[0]}`)
  }

  return (
    <div className="row py-1 align-items-center px-3">
      <div className="col-2">
        <img
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
            height: 50,
            width: 50,
          }}
          src={props?.orderItem[1].image}
          alt="Product Image"
        ></img>
      </div>
      <div className="col-6">
        <p className="mb-0">{props?.orderItem[1].title}</p>
      </div>
      <div className="col-2">
      <p className="mb-0">{props?.orderItem[1].quantity}</p>

      </div>
      <div className="col">
      <p className="mb-0">{props?.orderItem[1].price}</p>

      </div>
      <div className="col">
        <button onClick={goToReview}>Review</button>
      </div>
    </div>
  );
};

export default OrderItem;
