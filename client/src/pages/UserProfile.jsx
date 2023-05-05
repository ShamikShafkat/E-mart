import React , { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";


const UserProfile = () => {

    const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [nameLabel, setNameLabel] = useState("");
  const [currentPasswordLabel, setCurrentPasswordLabel] = useState("");
  const [addressLabel, setAddressLabel] = useState("");
  const [phoneLabel, setPhoneLabel] = useState("");
  const [newPasswordLabel, setNewPasswordLabel] = useState("");


  const updateProfile = (event)=>{
    if(!name)
    {
        setNameLabel("Name Field is must")
        return 
    }
    else{
      setNameLabel("")
    }
    if(!address)
    {
        setAddressLabel("Address Field is must")
        return 
    }
    else{
      setAddressLabel("")
    }
    if(!phone)
    {
        setPhoneLabel("Phone Field is must")
        return 
    }
    else if(phone.length!==11)
    {
      setPhoneLabel("Phone number is not valid")
      return 
    }
    else{
      setPhoneLabel("")
    }

    if(isNaN(phone))
    {
      setPhoneLabel("Phone number is not valid")
      return 
    }
    else{
      setPhoneLabel("")
    }

    Axios.put("http://localhost:5000/updateProfile",{
        uid : localStorage.getItem('customerLogin'),
        name:name,
        address:address,
        phone:phone,
        email:email
    }).then(response=>{
        console.log(response.data)
    }).catch(error=>{
        alert(error.response.data.error)
    })

  }

  const updatePassword = (event)=>{

    if(!currentPassword)
    {
        setCurrentPasswordLabel("Current password field is must")
        return 
    }
    else{
        setCurrentPasswordLabel("")
    }

    if(!newPassword)
    {
        setNewPasswordLabel("Please enter a new password")
        return
    }
    else if(newPassword.length<6)
    {
        setNewPasswordLabel("Password has to be minimum 6 characters")
        return
    }
    else
    {
        setNewPasswordLabel("")
    }

    Axios.put("http://localhost:5000/updatePassword",{
        email:email,
        currentPassword:currentPassword,
        newPassword:newPassword
    }).then(response=>{
        console.log(response.data)
    }).catch(error=>{
        alert(error.response.data.error)
    })

  }

  const logout = (event)=>{
    localStorage.removeItem('customerLogin')
    localStorage.setItem('loginStatus',"Login/Register")
    window.dispatchEvent(new Event('loginStorage'))
    navigate('/')
  }

  useEffect(()=>{
    Axios.get("http://localhost:5000/getCustomer", {
      params : {customerId : localStorage.getItem('customerLogin')}
    }).then((response) => {
      console.log(response.data)
      setName(response.data.name)
      setAddress(response.data.address)
      setPhone(response.data.phone)
      setEmail(response.data.email)
    });
  },[])

  return (
    <>
      <BreadCrumb title="User Profile" />
      <div className="user-profile-wrapper  py-3">
        <div className="container-xxl">
          <h3 className="py-2 mb-0 mx-2">User Profile</h3>
          <div className="row py-1">
            <div className="col-3 d-flex flex-column ">
              <div className="d-flex">
                <label className="mx-2">Name : </label>
                <p className="redstar mb-0">*</p>
              </div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="profile-input"
                value={name}
                onChange={(event)=>{
                    setName(event.target.value)
                }}
              ></input>
              <p className="input-label mx-2 mb-0">{nameLabel}</p>
            </div>
            <div className="col-6 d-flex flex-column">
              <div className="d-flex">
                <label className="mx-2">Address : </label>
                <p className="redstar mb-0">*</p>
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="profile-input"
                value={address}
                onChange={(event)=>{
                    setAddress(event.target.value)
                }}
              ></input>
              <p className="input-label mx-2 mb-0">{addressLabel}</p>
            </div>
            <div className="col-3 d-flex flex-column">
              <div className="d-flex">
                <label className="mx-2">Phone : </label>
                <p className="redstar mb-0">*</p>
              </div>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="profile-input"
                value={phone}
                onChange={(event)=>{
                    setPhone(event.target.value)
                }}
              ></input>
              <p className="input-label mx-2 mb-0">{phoneLabel}</p>
            </div>
          </div>
          <div className="row py-1">
            <div className="col-3 d-flex flex-column">
              <label className="mx-2">Email : </label>
              <p className="profile-input">{email}</p>
            </div>
          </div>
          <div className="row py-1">
            <div className="col-4 d-flex flex-column">
              <label className="mx-2">Current Password : </label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                className="profile-input"
                onChange={(event)=>{
                    setCurrentPassword(event.target.value)
                }}
              ></input>
              <p className="input-label mx-2 mb-0">{currentPasswordLabel}</p>
            </div>
            <div className="col-4 d-flex flex-column">
              <label className="mx-2">New Password : </label>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="profile-input"
                onChange={(event)=>{
                    setNewPassword(event.target.value)
                }}
              ></input>
              <p className="input-label mx-2 mb-0">{newPasswordLabel}</p>
            </div>
          </div>
          <div className="row py-2 d-flex flex-wrap ">
            <div className="col-4 ">
              <button className="user-profile-button" onClick={updateProfile}>Update Profile</button>
            </div>
            <div className="col-4">
              <button className="user-profile-button" onClick={updatePassword} >Update Password</button>
            </div>
            <div className="col-4">
              <button className="user-profile-button" onClick={(event)=>{
                navigate('/TrackOrders')
              }} >Track Orders</button>
            </div>
          </div>
          <div className="row py-3 mx-2 ">
            <button className="user-profile-button " onClick={logout}> Logout </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
