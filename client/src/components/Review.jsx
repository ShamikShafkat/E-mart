import React from "react";

const Review = (props) => {
  return (
    <>
      <div className="review py-3 my-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p> {props.message} </p>
              <p> Posted By : {props.customer}  </p>
              <p> Posted On : {props.date} </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
