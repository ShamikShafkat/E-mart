import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailLabel, setEmailLabel] = useState("");
  const [passwordLabel, setPasswordLabel] = useState("");

  const login = (event) => {

    console.log('Clicked')

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
    } else {
      setPasswordLabel("");
    }

    setIsLoading(true)
    toast
      .promise(
        Axios.post("http://localhost:5000/loginCustomer", {
          email: email,
          password: password,
        }),
        {
          pending: "Logging in...",
          success: "Login Successful",
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
      <BreadCrumb title="Login" />
      <div className="login-form-container">
        <div className="row">
          <div className="col-12">
            <div className="login-form-wrapper d-flex flex-column">
              <h3 className="text-center"> Login </h3>
              <form action="" className="login-form d-flex flex-column">
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
                <div className="mb-3">
                  <div className="d-flex">
                    <label className="px-2 ">Password</label>
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
              </form>
              <div style={{ textAlign: "center" }}>
                <button onClick={login}  disabled={isLoading} >Login</button>
              </div>
              <Link to="/ForgetPassword" className="py-3">
                Forget Password ?
              </Link>
              <div className="d-flex align-items-center justify-content-center py-3">
                <p className="mb-0">Don't have an account? Register now.</p>
                <Link to="/Register">
                  <button>Register</button>
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

export default LoginForm;
