import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "../../component/Navbar";
import "../../assets/css/login.css"; 
import {useNavigate} from 'react-router-dom'

function SignUp() {
  const [serverMessage, setServerMessage] = useState("");
const navigate=useNavigate()
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .required("Name required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post("http://localhost:3000/api/create", values);
      resetForm();
      if (res.data.result) {
        setServerMessage(res.data.message);
        navigate('/login')
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
    <div>

      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <h2>Signup</h2>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

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
              Signup
            </button>

            {serverMessage && (
              <div
                className="server-message"
                style={{
                  color: serverMessage.includes("successful") ? "green" : "red",
                }}
              >
                {serverMessage}
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
