import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [deliveryType, setDeliveryType] = useState("Home Delivery");
  const [totalBill, setTotalBill] = useState("0");

  const [customer, setCustomer] = useState({});
  const [isLoading,setIsLoading] = useState(false)

  const handleDeliveryOption = (event) => {
    if (event.target.value === "1") {
      setDeliveryType("Home Delivery");
    } else {
      setDeliveryType("Takeaway");
    }
  };

  const confirmOrder = (event) => {
    const currentDate = new Date();

    setIsLoading(true)
    toast
      .promise(
        Axios.post("http://localhost:5000/confirmOrder", {
          orderId: localStorage.getItem("orderId"),
          customerId: customer?.uid,
          status: "In Queue",
          totalPrice: Number(totalBill),
          deliveryType: deliveryType,
          date: currentDate.toLocaleDateString().toString(),
        }),
        {
          pending:"Please wait...",
          success:"Your order is confirmed"
        }
      )
      .then((response) => {
        setIsLoading(false)
        const uniqueId = uuidv4();
        localStorage.setItem("orderId", uniqueId);
        localStorage.removeItem("checkout");
        localStorage.setItem("cartItem", 0);
        window.dispatchEvent(new Event("cartStorage"));
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setIsLoading(false)
      });
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/calculateBill", {
      params: { orderId: localStorage.getItem("orderId") },
    }).then((response) => {
      setTotalBill(response.data);
    });

    Axios.get("http://localhost:5000/getCustomer", {
      params: { customerId: localStorage.getItem("customerLogin") },
    }).then((response) => {
      console.log(response.data);
      setCustomer(response.data);
    });
  }, []);

  const goToCart = (event) => {
    localStorage.removeItem("checkout");
    navigate("/CartView");
  };

  return (
    <>
      <BreadCrumb title="Checkout" />
      <div className="checkout-wrapper py-3">
        <div className="container-xxl">
          <h3 className="py-3">Checkout</h3>
          <div className="row">
            <div className="col-3">
              <div className="information">
                <label for="customer-name">Name:</label>
                <p className="mb-0">{customer?.name}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="information">
                <label for="customer-address">Address:</label>
                <p className="mb-0">{customer?.address}</p>
              </div>
            </div>
            <div className="col-3">
              <div className="information">
                <label for="customer-number">Phone Number:</label>
                <p className="mb-0">{customer?.phone}</p>
              </div>
            </div>
          </div>
          <div className="py-3">
            <label className="me-3" for="price-sort">
              Select Delivery Option :
            </label>
            <select
              name="delivery-type"
              id="delivery-type"
              onChange={handleDeliveryOption}
            >
              <option value="1">Home Delivery</option>
              <option value="2">Takeaway</option>
            </select>
          </div>
          <h5 className="text-end py-3">Total Bill : {totalBill}</h5>
          <div className="confirm-prev-button text-end">
            <button onClick={goToCart}>Back to Cart</button>
            <button onClick={confirmOrder} disabled={isLoading}>Confirm Order</button>
          </div>
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

export default Checkout;
