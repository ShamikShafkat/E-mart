import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgetPassword from './components/ForgetPassword';
import SingleProduct from './pages/SingleProduct';
import CartView from './pages/CartView';
import Checkout from './pages/Checkout';
import CategoryItems from './pages/CategoryItems';
import { v4 as uuidv4 } from 'uuid';
import UserProfile from './pages/UserProfile';
import TrackOrders from './pages/TrackOrders';
import Review from './pages/Review';



function App() {

  useEffect(()=>{
    if(localStorage.getItem('orderId'))
    {

    }
    else{
      const uniqueId = uuidv4();
      localStorage.setItem('orderId',uniqueId)
    }

    if(!localStorage.getItem('cartItem'))
    {
        localStorage.setItem('cartItem',0)
    }

    if(!localStorage.getItem('loginStatus'))
    {
        localStorage.setItem('loginStatus',"Login/Register")
    }
    
  },[])

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path='ProductListView/:category/:searchValue' element={<CategoryItems/>} />
          <Route path='Login' element={<LoginForm/>} />
          <Route path='Register' element={<RegisterForm/>} />
          <Route path='ForgetPassword' element={<ForgetPassword/>} />
          <Route path='SingleProductView/:productCode' element={<SingleProduct/>}/>
          <Route path='CartView' element={<CartView/>}/>
          <Route path='Checkout' element={<Checkout/>}/>
          <Route path='CategoryItems' element={<CategoryItems/>}/>
          <Route path='UserProfile' element={<UserProfile/>}/>
          <Route path='TrackOrders' element={<TrackOrders/>}/>
          <Route path='Review/:productCode' element={<Review/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
