import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [search, setSearch] = useState('');
  // .map function only applicable with arrays and not objects, that is why no curly braces in useState!
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let res = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res = await res.json();

    setFoodItem(res[0]);
    setFoodCat(res[1]);

    // console.log(res[0], res[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  // now we need that once this foodItem, foodCat data comes only then it should display everything -
  // multiple ways to handle this, like condition lgado, using if, else switch case else ternary operator
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
              />
              {/* <button
                className="btn btn-outline-success text-white "
                type="submit"
                // style={{ backgroundColor: "blue" }}
              >
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/900x700/?burger"
              alt="First slide"
              style={{ filter: "brightness(50%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/900x700/?pasta"
              alt="Second slide"
              style={{ filter: "brightness(50%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/900x700/?pizza"
              alt="Third slide"
              style={{ filter: "brightness(50%)" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          data-bs-target="#carouselExampleControls"
          type="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          data-bs-target="#carouselExampleControls"
          type="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>

      <div className="container">
        {    
          foodCat !== []
            ? foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key = {data._id} className="fs-3 m-3"> 
                  {data.CategoryName} 
                </div>
                <hr />
                {foodItem !== []
                ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                .map(filterItems => {
                  return(
                    <div key = {filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem = {filterItems}
                      options={filterItems.options[0]}
                      >
                      </Card>
                    </div>
                  )
                }): <div> No such data found </div>}
              </div>
            )
            })
          : ""
        }
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
