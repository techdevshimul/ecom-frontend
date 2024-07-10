import React, { useState } from "react";
import Layout from "../Layout";
import { showError, showSuccess, showLoading } from "../../utils/messages";
import { Link } from "react-router-dom";
import { createCategory } from "../../api/apiAdmin";
import { userInfo } from "../../utils/auth";

const CreateCategory = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    loading: false,
  });

  const { name, error, success, loading } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      loading: true,
      error: false,
      success: false,
    });
    const { token } = userInfo();
    createCategory(token, { name: name })
      .then((response) => {
        setValues({
          error: false,
          success: true,
          loading: false,
          name: "",
        });
      })
      .catch((err) => {
        if (err.response) {
          setValues({
            ...values,
            success: false,
            error: err.response.data,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            success: false,
            error: "Something Went Wrong!",
            loading: false,
          });
        }
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
      success: false,
    });
  };

  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            className="form-control"
          />
        </div>
        <br />
        <button type="submit" className="btn btn-outline-primary">
          Create Category
        </button>
      </form>
    );
  };

  const goBack = () => (
    <div className="mt-3">
      <Link to="/admin/dashboard" className="text-success">
        Go to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description="Ready to add a new category?"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {showLoading(loading)}
            {showError(error, error)}
            {showSuccess(success, "Category Created!")}
            {categoryForm()}
            {goBack()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
