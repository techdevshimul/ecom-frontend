import { useState } from "react";
import Layout from "../Layout";

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

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name:</label>
        <input type="text" name="name" className="form-control" value={name} />
      </div>
      <div className="form-group">
        <label className="text-muted">Email:</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password:</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={password}
        />
      </div>
      <br />
      <button type="submit" className="btn btn-primary" disabled={disabled}>
        Create Account
      </button>
    </form>
  );

  return (
    <Layout title="Register" className="container col-md-8 offset-md-2">
      <h3>Register Here,</h3>
      <hr />
      {signUpForm()}
      <hr />
    </Layout>
  );
};

export default Register;
