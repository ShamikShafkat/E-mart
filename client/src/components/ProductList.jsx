import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = (props) => {

  const [isLoading,setIsLoading] =useState(false)

  const addToCart = (event) => {
    if (props.product.availability === false) {
      toast.error("Product is not available")
      return;
    }

    setIsLoading(true)
    toast.promise(Axios.post("http://localhost:5000/addToCart", {
      orderId: localStorage.getItem("orderId"),
      productCode: props.product.productCode,
      title: props.product.title,
      image: props.product.image,
      quantity: "1",
      price: props.product.price,
    }),{
      pending:"Please wait...",
      success:"Added to cart"
    }).then((response) => {
      setIsLoading(false)
      localStorage.setItem(
        "cartItem",
        Number(localStorage.getItem("cartItem")) + 1
      );
      window.dispatchEvent(new Event("cartStorage"));
    });
  };

  return (
    <>
      <div className="p-item">
        <Link
          to={`/SingleProductView/${props.product.productCode}`}
          className="p-item-inner"
        >
          <span className="p-icon">
            <img src={props.product.image} alt="Product Image"></img>
          </span>
          <p>{props.product.title}</p>
        </Link>
        <div className="p-item-price">
          <p className="text-center"> {props.product.price}৳ </p>
        </div>
        <div className="p-item-availability">
          {props.product.availability === false ? (
            <p className="text-danger text-center">Out of Stock</p>
          ) : (
            <p className={"text-center"}>In Stock</p>
          )}
        </div>
        <div className="add-cart">
          <button className="add-to-cart-btn" onClick={addToCart} disabled={isLoading}>
            <img src="/images/cart.svg" alt="Cart"></img>
            <p className="mb-0">Add To Cart</p>
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
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

export default ProductList;
