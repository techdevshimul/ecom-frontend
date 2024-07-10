import { useEffect, useState } from "react";
import Layout from "../Layout";
import { showError, showLoading } from "../../utils/messages";
import { login, loginWithGoogleAPI } from "../../api/apiAuth";
import { Navigate } from "react-router-dom";
import { authenticate, isAuthenticated, userInfo } from "../../utils/auth";
import { API } from "../../utils/config";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    disabled: false,
    redirect: false,
  });

  const { email, password, loading, error, redirect, disabled } = values;

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

  const handleChange = (e) => {
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  const loginWithGoogle = () => {
    window.open(`${API}/auth/google`, "_self");
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

    login({
      email,
      password,
    })
      .then((response) => {
        authenticate(response.data.token, () => {
          setValues({
            email: "",
            password: "",
            success: true,
            disabled: false,
            loading: false,
            redirect: true,
          });
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

  const signInForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Email:</label>
        <input
          name="email"
          type="email"
          className="form-control"
          value={email}
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password:</label>
        <input
          name="password"
          type="password"
          className="form-control"
          value={password}
          required
          onChange={handleChange}
        />
      </div>
      <br />
      <button
        type="submit"
        className="btn btn-outline-primary"
        disabled={disabled}
      >
        Login
      </button>
    </form>
  );

  const redirectUser = () => {
    if (redirect)
      return <Navigate to={`/${userInfo().role}/dashboard`} replace />;
    if (isAuthenticated()) return <Navigate to="/" replace />;
  };

  return (
    <Layout title="Login" className="container col-md-8 offset-md-2">
      {redirectUser()}
      {showLoading(loading)}
      {showError(error, error)}
      <h3>Login Here</h3>
      <hr />
      {signInForm()}
      <hr />

      <button onClick={loginWithGoogle}>Sign In With Google</button>

      <a href="http://localhost:3001/api/auth/google/">
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
      </a>
      <br />

      <a href="http://localhost:3001/api/auth/facebook/">
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with fb</b>
          </p>
        </div>
      </a>
    </Layout>
  );
};

export default Login;
