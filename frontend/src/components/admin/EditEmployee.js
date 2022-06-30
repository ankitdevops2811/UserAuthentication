import "./EditEmployee.css";

import { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import { connect } from "react-redux";

const EditEmployee = ({ getToken }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({ firstName: "", lastName: "" });
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:4000/admin/edit/${id}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        navigate("/admin/dashboard");
      });
  };
  return (
    <>
      <div className="edit-employee">
        <h1>Edit Users</h1>
        <form onSubmit={submitHandler}>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={inputHandler}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={inputHandler}
          />
          <button class="btn btn-success">Edit</button>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    getToken: state.signin.token,
  };
};

export default connect(mapStateToProps, null)(EditEmployee);
