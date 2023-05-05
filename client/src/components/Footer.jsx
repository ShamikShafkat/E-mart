import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer-top py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h5 className="text-white">Stay Connected</h5>
              <p className="Shopname text-white"> E-mart</p>
              <address className="shop-address fs-10">
                {" "}
                30,30/1 Ihsaan Plaza <br />
                Rankin Street, Wari
                <br /> Dhaka-1203
              </address>
              <p className="text-white">Email:</p>
              <Link className="text-white"> shamik.shafkat@gmail.com </Link>
            </div>
            <div className="col-4"></div>
            <div className="col-4 ">
              <h5 className="text-white"> About Us </h5>
              <div className="links d-flex flex-column py-3">
                <Link className="text-white py-2">Privacy Policy</Link>
                <Link className="text-white py-2">Terms and Conditions</Link>
                <Link className="text-white py-2">Refund and Return Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-white text-center mb-0">
                &copy; {new Date().getFullYear()}; Powered By Shamik Shafkat |
                All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
