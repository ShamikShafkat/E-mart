import React from 'react';
import { NavLink, Link } from "react-router-dom";


const BreadCrumb = (props) => {
  return (
    <div className='b-crumb d-flex py-3 align-items-center justify-content-center'>
      <Link className='home-link' to="/"> Home </Link>
      <p className='mb-0'> / {props.title} </p>
    </div>
  );
}

export default BreadCrumb;
