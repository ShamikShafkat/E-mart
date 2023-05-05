import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import BreadCrumb from "../components/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailLabel, setEmailLabel] = useState("");
  const [nameLabel, setNameLabel] = useState("");
  const [passwordLabel, setPasswordLabel] = useState("");
  const [addressLabel, setAddressLabel] = useState("");
  const [phoneLabel, setPhoneLabel] = useState("");
  const [confirmPasswordLabel, setConfirmPasswordLabel] = useState("");

  const [isLoading,setIsLoading] = useState(false)

  const register = (event) => {
    if (!name) {
      setNameLabel("Name Field is must");
      return;
    } else {
      setNameLabel("");
    }
    if (!address) {
      setAddressLabel("Address Field is must");
      return;
    } else {
      setAddressLabel("");
    }
    if (!phone) {
      setPhoneLabel("Phone Field is must");
      return;
    } else {
      setPhoneLabel("");
    }

    if (isNaN(phone)) {
      setPhoneLabel("Phone number is not valid");
      return;
    } else {
      setPhoneLabel("");
    }

    if (!email) {
      setEmailLabel("Email Field is must");
      return;
    } else {
      setEmailLabel("");
    }

    if (!email.includes("@") || !email.includes(".")) {
      setEmailLabel("Email address not valid");
      return;
    } else {
      setEmailLabel("");
    }

    if (!password) {
      setPasswordLabel("Password Field is must");
      return;
    } else if (password.length < 6) {
      setPasswordLabel("Password should be minimum 6 characters");
    } else {
      setPasswordLabel("");
    }
    if (password !== confirmPassword) {
      setConfirmPasswordLabel("Password doesn't match");
      return;
    } else {
      setConfirmPasswordLabel("");
    }

    setIsLoading(true)
    toast
      .promise(
        Axios.post("http://localhost:5000/registerCustomer", {
      name: name,
      address: address,
      phone: phone,
      email: email,
      password: password,
    }),
        {
          pending: "Please wait...",
          success: "Registration Successful",
        }
      )
      .then((response) => {
        setIsLoading(false)
        localStorage.setItem("customerLogin", response.data.uid);
        localStorage.setItem("loginStatus", response.data.name);
        window.dispatchEvent(new Event("loginStorage"));
        if (localStorage.getItem("checkout")) {
          setTimeout(() => navigate("/Checkout"), 1000);
        } else {
          setTimeout(() => navigate("/"), 1000);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setIsLoading(false)
      });
  };

  return (
    <>
      <BreadCrumb title="Register" />
      <div className="register-form-container">
        <div className="row">
          <div className="col-12">
            <div className="register-form-wrapper d-flex flex-column">
              <h3 className="text-center"> Register </h3>
              <form action="" className="register-form d-flex flex-column">
                <div>
                  <div className="d-flex">
                    <label className="px-2 "> Name </label>
                    <p className="redstar mb-0">*</p>
                  </div>
                  <input
                    type="text"
                    name="Name"
                    placeholder="Name"
                    className="form-control py-2"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  ></input>
                  <label className="input-label px-2"> {nameLabel} </label>
                </div>
                <div>
                  <div className="d-flex">
                    <label className="px-2"> Address </label>
                    <p className="redstar mb-0 pb-1">*</p>
                  </div>
                  <input
                    type="text"
                    name="Address"
                    placeholder="Address"
                    className="form-control py-2"
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  ></input>
                  <label className="input-label px-2"> {addressLabel} </label>
                </div>
                <div>
                  <div className="d-flex">
                    <label className="px-2 "> Phone Number</label>
                    <p className="redstar mb-0 pb-1">*</p>
                  </div>

                  <input
                    type="text"
                    name="Phone"
                    placeholder="Phone Number"
                    className="form-control py-2"
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  ></input>
                  <label className="input-label px-2 "> {phoneLabel}</label>
                </div>
                <div>
                  <div className="d-flex">
                    <label className="px-2 ">Email</label>
                    <p className="redstar mb-0 pb-1">*</p>
                  </div>

                  <input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    className="form-control py-2"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  ></input>
                  <label className="input-label px-2 "> {emailLabel}</label>
                </div>
                <div>
                  <div className="d-flex">
                    <label className="px-2 ">
                      Password (Minimum 6 Characters)
                    </label>
                    <p className="redstar mb-0 pb-1">*</p>
                  </div>

                  <input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    className="form-control py-2"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  ></input>
                  <label className="input-label px-2 "> {passwordLabel}</label>
                </div>
                <div className="mb-3">
                  <div className="d-flex">
                    <label className="px-2 ">Confirm Password</label>
                    <p className="redstar mb-0 pb-1">*</p>
                  </div>
                  <input
                    type="password"
                    name="Password"
                    placeholder="Confirm Password"
                    className="form-control py-2"
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  ></input>
                  <label className="input-label px-2 ">
                    {" "}
                    {confirmPasswordLabel}
                  </label>
                </div>
              </form>
              <div style={{ textAlign: "center" }}>
                <button onClick={register} disabled={isLoading} >Register</button>
              </div>
              <div className="d-flex align-items-center justify-content-center py-3">
                <p className="mb-0">Already have an account? Login now </p>
                <Link to="/Login">
                  <button>Login</button>
                </Link>
              </div>
            </div>
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

export default RegisterForm;
