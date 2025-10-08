import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../assets/css/login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("Password required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", values);
  
      if (res.data.result) {
        setServerMessage(res.data.message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);    resetForm();
      } else {
        setServerMessage(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        setServerMessage(error.response.data.message);
      } else {
        setServerMessage("Server not responding");
      }
    }
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <h2>Login</h2>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          {serverMessage && (
            <div
              className="server-message"
              style={{
                color: serverMessage.includes("success") ? "green" : "red",
              }}
            >
              {serverMessage}
            </div>
          )}

          <div className="signup-link">
            Don't have an account? <Link to="/signup">Signup</Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
