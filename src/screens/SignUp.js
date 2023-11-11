import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const { credentials, useCredentials } = useState({
    name: "",
    email: "",
    address: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const respone = fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            name="name"
            value={credentials.name}
          />
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
          />
        </div>

        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={credentials.password}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <label for="LinkToLogin" className="text-muted">
          Already a user?
        </label>
        <Link to="/login" className="btn btn-danger" id="LinkToLogin">
          Login
        </Link>
      </form>
    </div>
  );
}
