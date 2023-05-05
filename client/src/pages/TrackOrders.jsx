import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Axios from "axios";
import OrderItem from "../components/OrderItem";
import { useNavigate } from "react-router-dom";

const TrackOrders = () => {
  const [orderList, setOrderList] = useState({});

  const navigate = useNavigate()

  const backToProfile = (event)=>{
    navigate('/UserProfile')
  }

  useEffect(() => {
    Axios.get("http://localhost:5000/getOrderList", {
      params: { customerId: localStorage.getItem("customerLogin") },
    })
      .then((response) => {
        setOrderList(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  return (
    <>
      <BreadCrumb title="TrackOrders" />
      <div className="track-orders-wrapper py-3">
        <div className="container-xxl">
          <h3 className="py-2 mx-2">Orders</h3>
          {Object.entries(orderList).map(([key, value]) => (
            <div className="order-entity py-3">
              <div className="row py-2">
                <div className="col-4 ">
                  <h6>OrderId </h6>
                  <p className="mb-0 ">{value[0].orderId}</p>
                </div>
                <div className="col-2">
                  <h6>Status </h6>
                  <p className="mb-0 ">{value[0].status}</p>
                </div>
                <div className="col-2">
                  <h6>Placed Date </h6>
                  <p className="mb-0 ">{value[0].date}</p>
                </div>
                <div className="col-2">
                  <h6>Delivery Type </h6>
                  <p className="mb-0 ">{value[0]?.deliveryType}</p>
                </div>
                <div className="col-2">
                  <h6>Total Bill </h6>
                  <p className="mb-0 ">{value[0]?.totalPrice}</p>
                </div>
              </div>
              <h5>Order Items : </h5>
              <div className="row py-2">
                <div className="col-2 "><h6>Image</h6></div>
                <div className="col-6 "><h6>Title</h6></div>
                <div className="col-2 "><h6>Quantity</h6></div>
                <div className="col"><h6>Price</h6></div>
              </div>
              <div className="order-item">
                {Object.entries(value[1]).map(
                  (productCode, orderItemDetails) => (
                    <OrderItem orderItem={productCode} />
                  )
                )}
              </div>
            </div>
          ))}
          <div className="back-to-profile py-3">
          <button className="mx-2" onClick={backToProfile}>Back To Profile</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrders;
