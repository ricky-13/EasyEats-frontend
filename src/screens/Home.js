import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
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
        <Carousel />
      </div>

      <div className="container">
        {
          
          foodCat !== []
            ? foodCat.map((data) => {
            return (
              <div>
                <div key = {data._id} className="fs-3 m-3"> 
                  {data.CategoryName} 
                </div>
                <hr />
                {foodItem !== []? foodItem.filter((item) => item.CategoryName == data.CategoryName)
                .map(filterItems => {
                  return(
                    <div key = {filterItems._id}>
                      <Card></Card>
                    </div>
                  )
                }): <div> No such data found </div>}
              </div>
            )
            })
          : ""
        }
        <Card />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
