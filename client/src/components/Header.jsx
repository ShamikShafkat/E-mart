import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartItemNumber,setCartItemNumber] = useState(localStorage.getItem('cartItem'))
  const [loginStatus,setLogicStatus] = useState(localStorage.getItem('loginStatus'))

  useEffect(() => {
    Axios.get("http://localhost:5000/getAllCategories").then((response) => {
      setAllCategories(response.data);
    });
  }, []);

  useEffect(() => {
    const handleCartChange = () => {
      setCartItemNumber(localStorage.getItem('cartItem') || 0);
    };

    window.addEventListener('cartStorage', handleCartChange);

    return () => {
      window.removeEventListener('cartStorage', handleCartChange);
    };
  }, []);


  useEffect(() => {
    const handleLoginStatus = () => {
      setLogicStatus(localStorage.getItem('loginStatus'));
    };

    window.addEventListener('loginStorage', handleLoginStatus);

    return () => {
      window.removeEventListener('loginStorage', handleLoginStatus);
    };
  }, []);


  const handleSearchButtonClick = (event) => {
    if (searchValue !== "") navigate(`/ProductListView/search/${searchValue}`);
  };

  const goToAccount = (event) => {
    if (localStorage.getItem("customerLogin")) {
      navigate("/UserProfile");
    } else {
      navigate("/Login");
    }
  };

  return (
    <>
      <header className="header-top py-3">
        <div className="container-xxl">
          <div className="row align-items-center d-flex flex-wrap">
            <div className="col-2">
              <h1>
                <Link className="text-white"> E-mart </Link>
              </h1>
            </div>
            <div className="col-6">
              <div className="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  onChange={(event) => setSearchValue(event.target.value)}
                />
                <span className="input-group-text" id="basic-addon2">
                  <BsSearch onClick={handleSearchButtonClick} />
                </span>
              </div>
            </div>
            <div className="col-3 d-flex justify-content-center">
              <div className="header-items d-flex  flex-wrap  align-items-center">
                <div onClick={goToAccount}>
                  <Link className="d-flex align-items-center text-white">
                    <img src="/images/user.svg" alt="Login"></img>
                    <p className="mb-0 px-1 text-white">
                      {" "}
                      {loginStatus}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-1 d-flex justify-content-end">
              <Link
                to="/CartView"
                className="d-flex align-items-center text-white"
              >
                <img src="/images/cart.svg" alt="Cart"></img>
                <div className="d-flex flex-column">
                  <sup className="badge bg-white text-dark">{cartItemNumber}</sup>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom ">
        <div className="container-xxl">
          <div className="row">
            {allCategories
              ? Object.entries(allCategories).map(([key, value]) => (
                  <div className="col">
                    <Link
                      className="d-flex align-items-center text-white"
                      to={`/ProductListView/${value.name}/123456789`}
                    >
                      <div className="dropdown">
                        <p>{value.name}</p>
                      </div>
                    </Link>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
