import React from "react";

const CartOrder = (props) => {

  const handleClick = (event)=>{
    console.log(props.productCode)
    props.removeCartItem(props.productCode,props.quantity)
  }

  console.log(props)
  return (
    <>
      <div className="order-wrapper py-2 ">
        <div className="container-xxl p-0">
          <div className="row align-items-center">
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
              src={props.image} alt="Product Image"></img>
            </div>
            <div className="col-6">
              <p className="mb-0">
                {props.title}
              </p>
            </div>
            <div className="col-2 text-start d-flex">
                <p className="mb-0 text-start"> {props.quantity} </p>
                <button className="cart-item-delete-button" onClick={handleClick}>  X  </button>
            </div>
            <div className="col text-start"> {props.price} </div>
            <div className="col text-start">{props.quantity*props.price}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartOrder;
