import React from "react";

export default function Card(props) {
  let options = props.options;
  let priceOption = Object.keys(options);

  const handleAddToCart = () => {};

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          className="card-img-top"
          src={props.imgSrc}
          alt="alt text"
          style={{ height: "200px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          {/* <p className="card-text">This is some important text.</p> */}
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded">
              {Array.from(Array(8), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select className="m-2 h-100 bg-success rounded">
              {priceOption.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>

            <div className="d-inline h-100 fs-4">Total Price</div>
          </div>
        </div>
        <hr></hr>
        <button
          className="btn btn-success justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
