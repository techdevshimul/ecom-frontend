import React, { useState } from "react";
import Layout from "../Layout";
import { showError, showSuccess, showLoading } from "../../utils/messages";
import { Link } from "react-router-dom";
import { createDiscountAPI } from "../../api/apiDiscount";
import { userInfo } from "../../utils/auth";

const CreateDiscount = () => {
  const [values, setValues] = useState({
    name: "",
    percentage: "",
    error: false,
    success: false,
    loading: false,
  });

  const { name, percentage, error, success, loading } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      loading: true,
      error: false,
      success: false,
    });
    const { token } = userInfo();
    createDiscountAPI(token, { name: name, percentage: percentage })
      .then((response) => {
        setValues({
          ...values,
          error: false,
          success: true,
          loading: false,
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
    if (e.target.name === "percentage") {
      if (e.target.value > 70) {
        e.target.value = "";
        setValues({ ...values, percentage: "" });
      }
    }

    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
      success: false,
    });
  };

  const discountForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Discount Code</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            className="form-control"
          />
          <br />
          <label className="text-muted">Discount Percentage</label>
          <input
            name="percentage"
            type="number"
            onChange={handleChange}
            value={percentage}
            required
            className="form-control"
          />
        </div>
        <br />
        <button type="submit" className="btn btn-outline-primary">
          Create Discount
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
      title="Add a new discount"
      description="Ready to add a new discount?"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {showLoading(loading)}
            {showError(error, error)}
            {showSuccess(success, "Discount Created!")}
            {discountForm()}
            {goBack()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateDiscount;
