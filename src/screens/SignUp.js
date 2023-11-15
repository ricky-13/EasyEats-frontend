import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  // nice way of taking all inputs instead of making different variable for each
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      location: credentials.geolocation,
    };
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    // the line below NEEDS TO HAVE AWAIT KEYWORD to receive the data before it logs, hence await is imperative
    const json = await response.json();
    console.log(json);

    console.log(requestData);

    if (!json.success) {
      alert("Enter valid credentials");
    }
  };

  // everytime the value of the input fields change, setCredentials is triggered and the name is set to the value
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Addresss"
            name="geolocation"
            value={credentials.geolocation}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <label htmlFor="LinkToLogin" className="m-3 text-muted">
          Already a user?
        </label>
        <Link to="/login" className="btn btn-danger" id="LinkToLogin">
          Login
        </Link>
      </form>
    </div>
  );
}
