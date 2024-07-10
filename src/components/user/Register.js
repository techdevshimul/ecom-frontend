import { useEffect, useState } from "react";
import Layout from "../Layout";
import { showError, showLoading } from "../../utils/messages";
import { register } from "../../api/apiAuth";
import { Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { API } from "../../utils/config";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    loading: false,
    disabled: false,
    success: false,
  });

  const { name, email, password, success, error, loading, disabled } = values;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      console.log("Received token:", token);
      // Save the token to local storage or handle it as needed
      localStorage.setItem("jwt", JSON.stringify(token));
      window.location.reload();
    }
  }, []);

  const loginWithGoogle = () => {
    window.open(`${API}/auth/google`, "_self");
  };

  const loginWithFacebook = () => {
    window.open(`${API}/auth/facebook`, "_self");
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(values));

    setValues({
      ...values,
      error: false,
      loading: true,
      disabled: true,
    });

    register({
      name,
      email,
      password,
    })
      .then((response) => {
        setValues({
          name: "",
          email: "",
          password: "",
          success: true,
          disabled: false,
          loading: false,
        });
      })
      .catch((err) => {
        let errMsg = "Something Went Wrong!";
        if (err.response) {
          errMsg = err.response.data;
        } else {
          errMsg = "Something Went Wrong!";
        }

        setValues({
          ...values,
          error: errMsg,
          disabled: false,
          loading: false,
        });
      });
  };

  const signUpForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name:</label>
        <input
          onChange={handleChange}
          required
          type="text"
          name="name"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email:</label>
        <input
          onChange={handleChange}
          required
          type="email"
          name="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password:</label>
        <input
          onChange={handleChange}
          required
          type="password"
          name="password"
          className="form-control"
          value={password}
        />
      </div>
      <br />
      <button
        type="submit"
        className="btn btn-outline-primary"
        disabled={disabled}
      >
        Create Account
      </button>
    </form>
  );

  const showSuccess = () => {
    if (success)
      return (
        <div className="alert alert-primary">
          {" "}
          New Account Created. Please <Link to="/login">Login</Link>
        </div>
      );
  };

  return (
    <Layout title="Register" className="container col-md-8 offset-md-2">
      {isAuthenticated() ? <Navigate to="/" replace /> : ""}
      {showSuccess()}
      {showLoading(loading)}
      {showError(error, error)}
      <h3>Register Here</h3>

      <hr />
      <button
        onClick={loginWithGoogle}
        className="btn btn-outline-success w-100"
      >
        <img
          style={{ width: "30px", marginRight: "10px" }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png"
        />
        Register With Google
      </button>
      <br />
      <br />
      <button
        onClick={loginWithFacebook}
        className="btn btn-outline-primary w-100"
      >
        <img
          style={{ width: "30px", marginRight: "10px" }}
          src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
        />
        Register With Facebook
      </button>
      <hr />
      <p style={{ fontSize: 25, textAlign: "center" }}>Or</p>

      <hr />

      <p
        style={{
          fontSize: 22,
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        Register With Email & Password
      </p>
      {signUpForm()}
      <hr />
    </Layout>
  );
};

export default Register;
