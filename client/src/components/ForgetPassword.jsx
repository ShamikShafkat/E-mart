import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import BreadCrumb from "../components/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ForgetPassword = () => {

  const [email, setEmail] = useState("");
  const [emailLabel, setEmailLabel] = useState("");

  const [isLoading,setIsLoading] = useState(false)

  const forgetPassword = (event)=>{
    if(!email)
    {
        setEmailLabel("Please enter your email")
        return
    }


    setIsLoading(true)
    toast.promise(Axios.post("http://localhost:5000/forgetPassword", {
      "email": email,
    }),{
      pending:"Please wait...",
      success: "A link has been sent to your email for password reset."
    }).then(response=>{
      setIsLoading(false)
    }).catch(error=>{
      setIsLoading(false)
      toast.error(error.response.data.error)
    })
  }

  return (
    <>
    <BreadCrumb title="Forget Password" />
    <div className="forget-password-form-container">
      <div className="row">
        <div className="col-12">
          <div className="forget-password-form-wrapper d-flex flex-column">
            <h3 className="text-center"> Reset Password </h3>
            <h6 className='text-center '> We will send you an email to reset your password </h6>
            <form action="" className="forget-password-form d-flex flex-column py-2">
              <div className='mb-2'>
                <input
                  type="email"
                  name="Email"
                  placeholder="Email"
                  className="form-control py-2"
                  onChange={(event)=>{
                    setEmail(event.target.value)
                  }}
                ></input>
              </div>
            </form>
            <div style={{ textAlign: "center" }}>
              <button onClick={forgetPassword} disabled={isLoading}>Submit</button>
            </div>
            <div className="d-flex align-items-center justify-content-center py-3">
              <Link to="/Login"><button>Back</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer
        position="top-center"
        autoClose={3000}
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
}

export default ForgetPassword;
