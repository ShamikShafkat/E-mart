import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Review from "../components/Review";
import ProductImages from "../components/ProductImages";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = (props) => {
  const params = useParams();
  const productCode = params.productCode;

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [reviewList, setReviewList] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:5000/getProductInfo", {
      params: { productCode: productCode },
    }).then((response) => {
      console.log(response.data.Review);
      setProduct(response.data);
      response.data.Review
        ? setReviewList(response.data.Review)
        : setReviewList({});
    });
  }, []);

  const increament = () => {
    if (!product.availability) {
      toast.error("Product is not available!");
      return;
    }

    setQuantity(quantity + 1);
  };

  const decreament = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = (event) => {
    if (!product.availability) {
      toast.error("Product is not available!");
      return;
    }


    toast.promise(Axios.post("http://localhost:5000/addToCart", {
      orderId: localStorage.getItem("orderId"),
      productCode: product.productCode,
      title: product.title,
      image: product.image,
      quantity: quantity.toString(),
      price: product.price,
    }),{
      pending:"Please wait...",
      success:"Added to cart"
    }).then((response) => {
      localStorage.setItem(
        "cartItem",
        Number(localStorage.getItem("cartItem")) + Number(quantity)
      );
      window.dispatchEvent(new Event("cartStorage"));
    });
  };

  return (
    <>
      <BreadCrumb title={product?.title} />
      <section className="single-product-view py-3">
        <div className="single-product-wrapper py-3">
          <div className="container-xxl">
            <div className="row">
              <div className="col-6">
                <div className="product-image">
                  <ProductImages imagesList={product?.imagesList} />
                </div>
              </div>
              <div className="col-6">
                <h4>{product?.title}</h4>
                <p className="mb-0 pb-4">
                  {product.productCode ? (
                    <p>Product Code : {product?.productCode}</p>
                  ) : (
                    <></>
                  )}
                </p>
                <h5 className="pb-1">Key Features</h5>

                {product.model ? <p>Model : {product?.model}</p> : <></>}
                {product.brand ? <p>Brand : {product?.brand}</p> : <></>}
                {product.productSpecification ? (
                  <>
                    {product.productSpecification.processor ? (
                      <p>
                        Processor : {product.productSpecification.processor}
                      </p>
                    ) : (
                      <></>
                    )}
                    {product.productSpecification.display ? (
                      <p>Display : {product.productSpecification.display}</p>
                    ) : (
                      <></>
                    )}
                    {product.productSpecification.ram ? (
                      <p>RAM : {product.productSpecification.ram}</p>
                    ) : (
                      <></>
                    )}
                    {product.productSpecification.storage ? (
                      <p>Storage : {product.productSpecification.storage}</p>
                    ) : (
                      <></>
                    )}
                    {product.productSpecification.camera ? (
                      <p>Camera : {product.productSpecification.camera}</p>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
                {product.price ? <p>Price : {product?.price}৳</p> : <></>}
                {product.warranty ? (
                  <p>Warranty : {product?.warranty}</p>
                ) : (
                  <></>
                )}
                {product.availability ? (
                  <p>Status : In Stock</p>
                ) : (
                  <p className="d-flex">
                    Status : <p className="text-danger mx-1"> Out of Stock </p>{" "}
                  </p>
                )}

                <div className="operation-buttons d-flex align-items-center">
                  <div className="d-flex">
                    <button className="py-1 px-3 mx-2" onClick={decreament}>
                      -
                    </button>
                    <input
                      className="quantity-text text-center"
                      type="text"
                      value={quantity}
                      readonly
                    ></input>
                    <button className="py-1 px-3 mx-2" onClick={increament}>
                      +
                    </button>
                  </div>
                  <div className="add-cart">
                    <button className="add-to-cart-btn" onClick={addToCart}>
                      <img src="/images/cart.svg" alt="Cart"></img>
                      <p className="mb-0">Add To Cart</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description-wrapper py-3 mt-3">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <h5>Description</h5>
                <h3 className="mb-0">{product?.title}</h3>
                <p className="mb-0 py-3">
                  {product?.productSpecification?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="review-wrapper py-3 mt-3">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <h5> Reviews </h5>
                {Object.keys(reviewList).length === 0 ? (
                  <p className="mb-0 py-2">
                    No reviews made yet for the product
                  </p>
                ) : (
                  Object.entries(reviewList).map(([key, value]) => (
                    <Review
                      message={value?.comment}
                      customer={value?.customerName}
                      date={value?.date}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
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

export default SingleProduct;
