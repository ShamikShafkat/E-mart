import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import ProductList from "../components/ProductList";
import Axios from "axios";

const CategoryItems = () => {
  const { category, searchValue } = useParams();
  const [productList, setProductList] = useState([]);
  const [priceRangeValue, setPriceRangeValue] = useState(500000);
  const [sortValue, setSortValue] = useState("0");

  useEffect(() => {
    if (category === "search") {
      Axios.get("http://localhost:5000/searchProduct", {
        params: { searchValue: searchValue },
      }).then((response) => {
        let sortedArray =
          sortValue === "-1"
            ? Object.entries(response.data).sort(
                ([key1, value1], [key2, value2]) => value2.price - value1.price
              )
            : Object.entries(response.data).sort(
                ([key1, value1], [key2, value2]) => value1.price - value2.price
              );

        setProductList(Object.fromEntries(sortedArray));
      });
    } else {
      Axios.get("http://localhost:5000/getCategoryProductList", {
        params: { category: category },
      }).then((response) => {
        let sortedArray =
          sortValue === "-1"
            ? Object.entries(response.data).sort(
                ([key1, value1], [key2, value2]) => value2.price - value1.price
              )
            : Object.entries(response.data).sort(
                ([key1, value1], [key2, value2]) => value1.price - value2.price
              );

        setProductList(Object.fromEntries(sortedArray));
      });
    }
  }, [category]);

  const sortProducts = (event) => {
    setSortValue(event.target.value);
    let sortedArray =
      event.target.value === "-1"
        ? Object.entries(productList).sort(
            ([key1, value1], [key2, value2]) => value2.price - value1.price
          )
        : Object.entries(productList).sort(
            ([key1, value1], [key2, value2]) => value1.price - value2.price
          );
    setProductList(Object.fromEntries(sortedArray));
  };


  const handleFilterChange = (event)=>{
    setPriceRangeValue(event.target.value)
  }

  const filterProducts = (event) => {
    console.log("Filter Products Called")
    setPriceRangeValue(event.target.value);
    Axios.get("http://localhost:5000/filterProductList", {
      params: {
        priceRange: Number(event.target.value),
        category: category,
        searchValue: searchValue,
      },
    }).then((response) => {
      let sortedArray =
        sortValue === "-1"
          ? Object.entries(response.data).sort(
              ([key1, value1], [key2, value2]) => value2.price - value1.price
            )
          : Object.entries(response.data).sort(
              ([key1, value1], [key2, value2]) => value1.price - value2.price
            );

      setProductList(Object.fromEntries(sortedArray));
    });
  };

  return (
    <>
      <BreadCrumb title="Category" />
      <div className="category-product-list-wrapper py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="price-filter bg-white p-3 d-flex flex-column">
                <h5>Price Range</h5>
                <label for="points">Price : {priceRangeValue}</label>
                <input
                  type="range"
                  id="points"
                  name="points"
                  min={0}
                  value={priceRangeValue}
                  max={500000}
                  onChange={handleFilterChange}
                  onTouchEnd={filterProducts}
                  onMouseUp={filterProducts}
                ></input>
              </div>
            </div>
            <div className="col-9 d-flex flex-column">
              <div className="category-sort d-flex bg-white p-3">
                <div className="flex-grow-1">
                  <p className="mb-0">Result for {category}</p>
                </div>
                <div>
                  <label className="me-3" for="price-sort">
                    Sort :
                  </label>
                  <select
                    name="price-sort"
                    id="price-sort"
                    onChange={sortProducts}
                  >
                    <option value="0">Default</option>
                    <option value="1">{`Price (Low to High)`}</option>
                    <option value="-1">{`Price (High to Low)`}</option>
                  </select>
                </div>
              </div>
              <div className="p-item-wrap d-flex flex-wrap justify-content-start py-3">
                {Object.entries(productList).map(([key, value]) => {
                  return <ProductList product={value} />;
                })}
                {Object.keys(productList).length === 0 ? (
                  <p className="mx-2">No product to display</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryItems;
