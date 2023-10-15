import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../../utils/mutations";
import auth from "../../../utils/auth";
import "./index.scss"; // Import the stylesheet

const UserSignup = () => {
  // Set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  // Set state for form validation
  const [validated] = useState(false);

  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if the form is valid (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    });
  };

  return (
    <>
      <div>
        <div className="login-container">
          <section className="login-box">
            <h2>Sign Up</h2>
            <Form
              id="signupForm"
              noValidate
              validated={validated}
              onSubmit={handleFormSubmit}
            >
              {/* Show an alert if the server response is bad */}
              <Alert
                dismissible
                onClose={() => setShowAlert(false)}
                show={showAlert}
                variant="danger"
              >
                Something went wrong with your signup! Phone number must have
                exactly 10 characters.
              </Alert>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="username"></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleInputChange}
                  value={userFormData.username}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Username is required!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="email"></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleInputChange}
                  value={userFormData.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Email is required!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="phoneNumber"></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone number"
                  name="phoneNumber"
                  onChange={handleInputChange}
                  value={userFormData.phoneNumber}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Phone Number is required!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="password"></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={userFormData.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password is required!
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                id="signupBtn"
                disabled={
                  !(
                    userFormData.username &&
                    userFormData.email &&
                    userFormData.phoneNumber &&
                    userFormData.password
                  )
                }
                type="submit"
                variant="success"
              >
                Submit
              </Button>
            </Form>
          </section>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
