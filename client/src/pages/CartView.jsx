import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import CartOrder from "../components/CartOrder";
import { NavLink, Link, useNavigate, useSubmit } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartView = () => {
  const [orderItemList, setOrderItemList] = useState({});
  const [totalPrice,setTotalPrice] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    Axios.get("http://localhost:5000/getCartItems", {
      params: {
        orderId: localStorage.getItem("orderId"),
      },
    }).then((response) => {
      setOrderItemList(response.data);
    });
  }, []);

  const removeCartItem = (productCode,quantity) => {

    toast.promise(Axios.delete("http://localhost:5000/removeCartItem", {
      params: {
        productCode: productCode,
        orderId: localStorage.getItem("orderId"),
      },
    }),{
      pending:"Please wait...",
      success:"Item removed"
    }).then((response) => {
      setOrderItemList(response.data);
      localStorage.setItem('cartItem',Number(localStorage.getItem('cartItem')) - Number(quantity))
      window.dispatchEvent(new Event('cartStorage'))
    });
  };

  const goToCheckout = (event)=>{
      if(localStorage.getItem('customerLogin'))
      {
        navigate(`/Checkout`)  
      }
      else
      {
          localStorage.setItem("checkout",true)
          navigate(`/Login`)
      }
  }

  useEffect(() => {
    setTotalPrice( Object.values(orderItemList).reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0
    ))
  }, [orderItemList]);

  return (
    <>
      <BreadCrumb title="Cart" />
      <div className="cart-view-wrapper py-3">
        <div className="container-xxl">
          {Object.keys(orderItemList).length!==0 ? (
            <div className="row">
              <h3 className="py-2"> Shopping Cart </h3>
              <div className="col-2 text-start">Image</div>
              <div className="col-6 text-start">Product Name</div>
              <div className="col-2 text-start">Quantity</div>
              <div className="col text-start">Unit Price</div>
              <div className="col text-start">Total</div>

              {Object.entries(orderItemList).map(([key, value]) => (
                <div key={key}>
                  <CartOrder
                    productCode={key}
                    image={value.image}
                    title={value.title}
                    quantity={value.quantity}
                    price={value.price}
                    removeCartItem={removeCartItem}
                  />
                </div>
              ))}

              <div className="price-checkout text-end py-3 px-3">
                <h4 className="">
                  {" "}
                  Total :{" "}
                  {totalPrice}
                </h4>
                  <button onClick={goToCheckout}> Checkout </button>
              
              </div>
            </div>
          ) : (
            <h5 className="mb-0 text-center py-3">No items in the cart</h5>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default CartView;
