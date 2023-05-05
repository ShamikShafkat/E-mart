import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Review = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [commentLabel, setCommentLabel] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const goToTrackOrders = (event) => {
    navigate("/TrackOrders");
  };

  const postReview = (event) => {
    if (!comment) {
      setCommentLabel("Please write some comment about the product");
      return;
    }

    setCommentLabel("");

    setIsLoading(true);

    toast
      .promise(
        Axios.post("http://localhost:5000/postReview", {
          productCode: params.productCode,
          reviewId: uuidv4(),
          customerId: localStorage.getItem("customerLogin"),
          date: new Date().toLocaleDateString().toString(),
          comment: comment,
        }),
        {
          pending: "Please wait...",
          success: "Your review is posted.",
        }
      )
      .then((response) => {})
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <>
      <BreadCrumb title="Post Review" />
      <div className="review-page-wrapper py-3">
        <div className="container-xxl">
          <h3 className="py-2">Post Review</h3>
          <label for="comment">Comment:</label>
          <textarea
            onChange={(event) => {
              setComment(event.target.value);
            }}
            className="form-control"
            rows="5"
            id="comment"
          ></textarea>
          <label className="text-area-label">{commentLabel}</label>
          <div className="review-page-button d-flex flex-wrap justify-content-between">
            <button className="my-3" onClick={postReview}>
              Post Review
            </button>
            <button className="my-3" onClick={goToTrackOrders}>
              Previous Page
            </button>
          </div>
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

export default Review;
