import React, { useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import ProductList from "../components/ProductList";
import Axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/getFeaturedProducts").then((response) => {
      setFeaturedProducts(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:5000/getAllCategories").then((response) => {
      setFeaturedCategories(response.data);
    });
  }, []);


  return (
    <>
      <section className="advertise-section mt-3 mb-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col">
              <ImageSlider />
            </div>
          </div>
        </div>
      </section>
      <section className="rest-of-home py-1">
        <div className="container-xxl">
          <div className="sliding-text-wrap mb-0">
            <marquee direction="left">
              All of our shops are open today.Make your eid more enjoyable by
              visiting us.
            </marquee>
          </div>
          <div className="featured-catgeories py-3">
            <h3 className="text-center"> Featured Categories </h3>
            <p className="text-center">
              Get Your Desired product From Featured Category!
            </p>
            <div className="cat-item-wrap d-flex flex-wrap justify-content-center ">
              {Object.entries(featuredCategories)
                .filter(([key, value]) => value.featured === true)
                .map(([key, value]) => (
                  <div className="cat-item">
                    <Link
                      to={`/ProductListView/${value.name}/123456789`}
                      className="cat-item-inner"
                    >
                      <span className="cat-icon">
                        <img src={value.image} alt="Category Image"></img>
                      </span>
                      <p className="text-center"> {value.name} </p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <div className="featured-products py-3">
            <h3 className="text-center"> Featured Products </h3>
            <p className="text-center">Check & Get Your Desired Product!</p>
            <div className="p-item-wrap d-flex flex-wrap justify-content-center ">
              {featuredProducts.map((n) => (
                <ProductList product={n} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
